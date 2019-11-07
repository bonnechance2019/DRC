import Vue from 'vue'
import { LocalStorage, Loading, QSpinnerGears, QSpinnerPie } from 'quasar'
import firebase from 'firebase/app'
import { showError } from 'src/functions/show-error'

const state = {
    loggedIn: false,
    auth: {
        // 'uid': {
        //     email: '',
        //     password: ''
        // }
    }
}

const mutations = {
    setLoggedIn(state, value) {
        state.loggedIn = value
    },

    addAuth(state, payload) {
        Vue.set(state.auth, payload.id, payload.data) // if state 是陣列則可以使用 state.tasks.push()
    },
    updateAuth(state, payload) {
        Object.assign(state.auth[payload.id], payload.updates)
    },
    deleteAuth(state, id) {
        Vue.delete(state.auth, id) //從 state 的 auth 裡找出相同的 id
    },
}

const actions = {
    registerUser({dispatch,commit}, payload) {
        Loading.show({
            spinner: QSpinnerGears,
            spinnerColor: 'primary'
          })

        let authRef = firebase.firestore().collection('auths'),
            track = {whom: '', what: ''}

        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
            console.log('成功:', response)
            authRef.doc(firebase.auth().currentUser.uid).set(payload)
            commit('addAuth', payload)

            track.what = 'register'
            dispatch('track/addTrack', track, { root: true })
        })
        .catch(error => {
            showError(error.message)
        })
    },
    loginUser({dispatch}, payload) {
        Loading.show({
            spinner:QSpinnerPie,
            spinnerSize: '5em',
            spinnerColor: 'primary',
            message: 'Wait...hold on......',
            messageColor: 'white'
          })

        let track = {whom: '', what: ''}

        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
            console.log('成功:', response)
            track.what = 'login'
            dispatch('track/addTrack', track, { root: true })
        })
        .catch(error => {
            showError(error.message)
        }) 
    },
    logoutUser({dispatch}) {
        let track = {whom: '', what: ''}
        track.what = 'logout'
        track.whom = firebase.auth().currentUser.uid
        dispatch('track/addTrack', track, { root: true })

        firebase.auth().signOut()
    },
    handleAuthState({commit, dispatch}) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                commit('setLoggedIn', true)
                LocalStorage.set('loggedIn', true)
                if (this.$router.currentRoute.path != '/') { // 如果已經在'/'，又導向'/'則會報錯
                    this.$router.replace('/') // 如果是 push 則使用者可以返回上一頁，在未登出的情況下回到登入頁面進行操作
                }
                dispatch('fbReadData')
                //dispatch('index/fbReadData', null, { root: true })
            }
            else {
                commit('index/clearData', null, { root: true })
                commit('setLoggedIn', false)
                LocalStorage.set('loggedIn', false)
                if (this.$router.currentRoute.path != '/auth') { // 如果已經在'/auth'，又導向'/auth'則會報錯
                    this.$router.replace('/auth')
                }
            }
            Loading.hide()
          });
    },
    updateAuth({dispatch}, payload) {
        dispatch('fbUpdateAuth', payload)
    },

    fbReadData({commit}) {
        let db = firebase.firestore(),
            payload = {id:'', data:{}}

        db.collection('auths').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type == 'added') {
                    payload.id = change.doc.id
                    payload.data = change.doc.data()
                    commit('addAuth', payload)
                }
                if (change.type == 'modified') {
                    payload.id = change.doc.id
                    payload.updates = change.doc.data()
                    commit('updateAuth', payload)
                }
                if (change.type == 'removed') {
                    payload.id = change.doc.id
                    commit('deleteAuth', payload.id)
                }
            })
        })
    },
    fbUpdateAuth({}, payload) {
        let authRef = firebase.firestore().collection('auths'),
            authId = firebase.auth().currentUser.uid
        
        authRef.doc(authId).update(payload)
    }
}

const getters = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}