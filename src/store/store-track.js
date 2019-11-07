import firebase from 'firebase/app'

const state = {
    tracks: {
        // date:{
        //     auth: '',
        //     what: '',
        //     name: ''
        // }
    }
}
const mutations = {
    addTrack(state, payload) {

    },
    deleteTrack(state, payload) {

    }
}
const actions = {
    addTrack({dispatch}, payload) {
        let auth = firebase.auth().currentUser.uid,
            now = new Date()
        console.log(auth,"在", now, " ：", payload.what, ' ',payload.whom)
    },

    fbReadTrack({}) {
        console.log('in')
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