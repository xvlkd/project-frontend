import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

Axios.defaults.baseURL = 'http://localhost:8000/api'

export default new Vuex.Store({
  state: {
    users: null
  },

  mutations: {
    setUserData (state, userData) {
      state.users = userData
      localStorage.setItem('users', JSON.stringify(userData))
      Axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`
    },

    clearUserData () {
      localStorage.removeItem('users')
      location.reload()
    }
  },

  actions: {
    login ({ commit }, credentials) {
      return Axios
        .post('/login', credentials)
        .then(({ data }) => {
          commit('setUserData', data)
        })
    },

    logout ({ commit }) {
      commit('clearUserData')
    }
  },

  getters : {
    isLogged: state => !!state.user
  }
})