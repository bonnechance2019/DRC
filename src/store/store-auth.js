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
    updateAuth(state, payload) {
        Object.assign(state.auth[payload.id], payload.updates)
    },
    deleteAuth(state, id) {
        Vue.delete(state.auth, id) //從 state 的 tasks 裡找出相同的 id
    },
    addAuth(state, payload) {
        Vue.set(state.auth, payload.id, payload.data) // if state 是陣列則可以使用 state.tasks.push()
    },
}

const actions = {
    registerUser({commit}, payload) {
        Loading.show({
            spinner: QSpinnerGears,
            spinnerColor: 'primary'
          })

        let authRef = firebase.firestore().collection('auths')

        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
            console.log('成功:', response)
            authRef.doc(firebase.auth().currentUser.uid).set(payload)
            commit('addAuth', payload)
        })
        .catch(error => {
            showError(error.message)
        })
    },
    loginUser({}, payload) {
        Loading.show({
            spinner:QSpinnerPie,
            spinnerSize: '5em',
            spinnerColor: 'primary',
            message: 'Wait...hold on......',
            messageColor: 'white'
          })

        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
            console.log('成功:', response)
        })
        .catch(error => {
            showError(error.message)
        }) 
    },
    logoutUser() {
        firebase.auth().signOut()
    },
    handleAuthState({commit, dispatch}) {
        firebase.auth().onAuthStateChanged(user => {
            Loading.hide()

            if (user) {
                commit('setLoggedIn', true)
                LocalStorage.set('loggedIn', true)
                if (this.$router.currentRoute.path != '/') { // 如果已經在'/'，又導向'/'則會報錯
                    this.$router.replace('/') // 如果是 push 則使用者可以返回上一頁，在未登出的情況下回到登入頁面進行操作
                }
                dispatch('fbReadData')
                dispatch('index/fbReadData', null, { root: true })
            }
            else {
                commit('index/clearData', null, { root: true })
                commit('setLoggedIn', false)
                LocalStorage.set('loggedIn', false)
                if (this.$router.currentRoute.path != '/auth') { // 如果已經在'/auth'，又導向'/auth'則會報錯
                    this.$router.replace('/auth')
                }
            }
          });
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

                }
                if (change.type == 'removed') {
                    console.log('removed')
                }
            })
        })
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