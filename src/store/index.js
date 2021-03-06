import Vue from 'vue'
import Vuex from 'vuex'
import files from './modules/files'
import directory from './modules/directory'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbarText: '',
    snackbarTime: 200,
    snackbarColor: ''
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    files,
    directory
  }
})
