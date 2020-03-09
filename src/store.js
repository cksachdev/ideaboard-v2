import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import VueAxios from 'vue-axios'
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

const baseURL = 'https://script.google.com/macros/s/AKfycbwHJXdd3uHsbnKtd_1MTYALHmWVF0aSOZ64xqB1sZDCrlLIdfw/exec'

Vue.use(Vuex, VueAxios, axios)

export default new Vuex.Store({
    plugins: [createPersistedState({
        storage: {
          getItem: key => ls.get(key),
          setItem: (key, value) => ls.set(key, value),
          removeItem: key => ls.remove(key)
        }
      })],
  state: {
    isUserLoggedIn: false,
    userDetails: {},
    userEmail: '',
    isNewIdea: false,
    ideaList: [],
    dataObjectModal: [],
    isLoading: false
  },
  getters: {
    GET_IDEA_LIST: state => {
        return state.ideaList
    },
    GET_DATA_OBJ_MODAL: state => {
        return state.dataObjectModal
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
    SET_IDEA_TO_LIST (state, ideaList) {
        state.ideaList = ideaList
    },
    PUSH_IDEA_TO_LIST (state, idea) {
        state.ideaList.push(idea)
    },
    SET_LIST_MODAL_EMPTY (state) {
        state.dataObjectModal = [];
    },
    IDEA_OBJECT_MODEL (state, ideaModal) {
        state.dataObjectModal.push(ideaModal);
    },
    SET_IS_LOADING (state, value) {
        state.isLoading = value
    }
  },
  actions: {
    LOGOUT: async ({ commit, state}) => {
        localStorage.removeItem('ideaBoardUser');
        commit('SET_USER_LOGGEDIN', !state.isUserLoggedIn)
    },
    CHECK_IS_LOGGEDIN: async({ commit, state }) => {
        commit('SET_IS_LOADING', true);
        if(state.userDetails.zu) {
            commit('SET_USER_DETAILS', state.userDetails)
            commit('SET_USER_EMAIL', state.userDetails.zu)
            commit('SET_USER_LOGGEDIN', true)
        } else {
            commit('SET_USER_DETAILS', {})
            commit('SET_USER_EMAIL', '')
            commit('SET_USER_LOGGEDIN', false)
        }
        commit('SET_IS_LOADING', false); 
    },
    GET_IDEAS_LIST: async({ commit, state }) => {
        if(state.ideaList.length <= 0) {
            commit('SET_IS_LOADING', true);
            axios.get(`${baseURL}?action=read&table=idea`)
            .then(response => {
                if(response.status === 200) {
                    commit('SET_IDEA_TO_LIST', response.data.records)
                    commit('SET_LIST_MODAL_EMPTY');
                    for(let ideaObj of state.ideaList) {
                        let tags = Vue._.split(ideaObj.tags, ', ');
                        ideaObj.tags = tags
                        commit('IDEA_OBJECT_MODEL', ideaObj)
                    }
                    commit('REMOVE_NEW_IDEA')
                    commit('SET_IS_LOADING', false);
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    },
    REMOVE_IDEA: async({ commit, state }, payload) => {
        commit('SET_IS_LOADING', true);
        axios.get(`${baseURL}?action=delete&table=idea&id=${payload.ideaid}`)
        .then(response => {
            if(response.status === 200) {
                let oldIdeaList = state.ideaList
                let ideaList = _.remove(oldIdeaList, function(idea) {
                    return idea.id !== payload.ideaid;
                });  
                commit('SET_IDEA_TO_LIST', ideaList)
                for(let ideaObj of ideaList) {
                    let tags = Vue._.split(ideaObj.tags, ', ');
                    ideaObj.tags = tags
                    commit('IDEA_OBJECT_MODEL', ideaObj)
                }
                if(payload.showAlert) {
                    alert('Idea deleted successfully.')
                }
                commit('SET_IS_LOADING', false);
            }
        })
        .catch(error => {
            console.log(error);
        });
    },
    CREATE_IDEA: async({ commit }, payload) => {
        commit('SET_IS_LOADING', true);
        axios.get(`${baseURL}?action=insert&table=idea&data=${JSON.stringify(payload)}`)
        .then(response => {
            if(response.status === 200) {
                alert('idea inserted successfully');
                let resData = response.data.data
                commit('PUSH_IDEA_TO_LIST', resData)
                let tags = Vue._.split(resData.tags, ', ');
                resData.tags = tags
                commit('IDEA_OBJECT_MODEL', resData)
                commit('SET_IS_LOADING', false);
                commit('REMOVE_NEW_IDEA')
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
   }


})