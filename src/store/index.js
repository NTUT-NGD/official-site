import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import { signin, getAuthState } from "@/api/auth/signin.js";
import { signout } from "@/api/auth/signout.js";
import { register } from "@/api/auth/register.js";
import { retrive, retriveDoc } from "@/api/retriveData/retrive.js";
import { retriveImage } from "@/api/retriveData/retriveImage.js";

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  state: {
    login: false,
    user: null,
    isAdmin: false,
    pageLoading: false,
    activedPage: "",
    games: null,
    events: null,
    adventureX: 640,
    adventureY: 480,
    selectGame: null,
    selectProject: null
  },
  mutations: {
    async setUser(state, payload) {
      let auth = [];
      auth.push(payload);
      auth.push(await getAuthState(payload));
      state.user = auth;
      if (payload == null) return;
      let adminList = [
        "t107590017@ntut.org.tw",
        "t107590009@ntut.org.tw",
        "t107590011@ntut.org.tw",
        "ntut.game.design@gmail.com"
      ];
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
    async setDatas(state) {
      state.games = await retrive("Games");
      state.games.forEach(async element => {
        element.imgURL = await retriveImage(element);
      });
    },
    setSelectGame(state, val) {
      state.selectGame = val;
    },
    setSelectProject(state, val) {
      state.selectProject = val;
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
    },
    dispatchSelectGame({ commit }, payload) {
      commit("setSelectGame", payload);
    },
    dispatchSelectProject({ commit }, payload) {
      commit("setSelectProject", payload);
    },
    dispatchUpdateSelectProject(payload) {
      retriveDoc("Projects", payload);
    }
  },
  modules: {}
});
