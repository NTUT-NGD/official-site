import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activedPage: "",
    games: null
  },
  mutations: {
    setActivedPage(state, val) {
      state.activedPage = val;
    },
    setGames(state, val) {
      state.games = val;
    }
  },
  actions: {},
  modules: {}
});
