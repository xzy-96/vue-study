import Vue from "vue";
import Vuex from "../XVuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 1,
  },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  mutations: {
    add: (state) => state.count++,
  },
  actions: {
    add({ commit }) {
      setTimeout(() => {
        commit("add");
      }, 1000);
    },
  },
  modules: {},
});
