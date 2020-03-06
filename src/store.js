import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import VueAxios from 'vue-axios'

const baseURL = 'https://script.google.com/macros/s/AKfycbwHJXdd3uHsbnKtd_1MTYALHmWVF0aSOZ64xqB1sZDCrlLIdfw/exec'

Vue.use(Vuex, VueAxios, axios)

export default new Vuex.Store({
  state: {
    isUserLoggedIn: false,
    userDetails: {},
    userEmail: '',
    isNewIdea: false,
    ideaList: [],
    dataObjectModal: []
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
    },
    ADD_IDEA_TO_LIST (state, ideaList) {
        state.ideaList = ideaList
    },
    IDEA_OBJECT_MODEL (state, ideaModal) {
        state.dataObjectModal.push(ideaModal);
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
    },
    GET_IDEAS_LIST: async({ commit, state }) => {
        axios.get(`${baseURL}?action=read&table=idea`)
        .then(response => {
            if(response.status === 200) {
                commit('ADD_IDEA_TO_LIST', response.data.records)
                for(let ideaObj of state.ideaList) {
                    let tags = Vue._.split(ideaObj.tags, ', ');
                    ideaObj.tags = tags
                    commit('IDEA_OBJECT_MODEL', ideaObj)
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
   }


})