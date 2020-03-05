import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'https://script.google.com/macros/s/AKfycbwHJXdd3uHsbnKtd_1MTYALHmWVF0aSOZ64xqB1sZDCrlLIdfw/exec'

Vue.use(Vuex, VueAxios, axios)

export default new Vuex.Store({
  state: {
    isUserLoggedIn: false,
    userDetails: {},
    userEmail: '',
    isNewIdea: false,
    ideaList: []
  },
  getters: {
    frameworkCount: state => {
        return state.frameworkList.length
    }
  },
  mutations: {
    SET_USER_DETAILS (state, user) {
        state.userDetails = user
    },
    SET_USER_EMAIL (state, email) {
        state.userEmail = email
    },
    SET_USER_LOGGEDIN (state, isUserLoggedIn) {
        state.isUserLoggedIn = isUserLoggedIn
    },
    ADD_NEW_IDEA (state) {
        state.isNewIdea = true
    },
    REMOVE_NEW_IDEA (state) {
        state.isNewIdea = false
    }
  },
  actions: {
    LOGOUT: async ({ commit, state}) => {
        localStorage.removeItem('ideaBoardUser');
        commit('SET_USER_LOGGEDIN', !state.isUserLoggedIn)
    },
    CHECK_IS_LOGGEDIN: async({ commit, state }) => {
        let userData = localStorage.getItem('ideaBoardUser')
        if(userData) {
            userData = JSON.parse(userData)
            commit('SET_USER_DETAILS', userData) 
            commit('SET_USER_EMAIL', userData.zu) 
            commit('SET_USER_LOGGEDIN', !state.isUserLoggedIn) 
        }
    }
  }


})