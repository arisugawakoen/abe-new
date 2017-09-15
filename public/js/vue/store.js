import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    reloadTrigger: false
  },
  mutations: {
    reload (state) {
      state.reloadTrigger = !state.reloadTrigger
    }
  },
  actions: {
    reload ({commit}) {
      commit('reload')
    }
  }
})
