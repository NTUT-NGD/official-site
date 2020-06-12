import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { signin } from "@/api/auth/signin.js";
import { signout } from "@/api/auth/signout.js";
import { register } from "@/api/auth/register.js";

export default new Vuex.Store({
  state: {
    login: false,
    user: null,
    isAdmin: false,
    pageLoading: false,
    activedPage: "",
    games: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      if (payload == null) return;
      let adminList = ["t107590017@ntut.org.tw", "ntut.game.design@gmail.com"];
      if (adminList.includes(payload.email)) state.isAdmin = true;
    },
    setLogin(state, payload) {
      state.login = payload;
    },
    setLoading(state, val) {
      state.pageLoading = val;
    },
    setActivedPage(state, val) {
      state.activedPage = val;
    },
    setGames(state, val) {
      state.games = val;
    }
  },
  actions: {
    userSignIn() {
      signin();
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", payload);
      commit("setLogin", true);
      register();
    },
    userSignOut({ commit }) {
      signout();
      commit("setUser", null);
    }
  },
  modules: {}
});
