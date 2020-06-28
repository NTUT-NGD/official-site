import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import { signin } from "@/api/auth/signin.js";
import { signout } from "@/api/auth/signout.js";
import { register } from "@/api/auth/register.js";
import { retrive } from "@/api/retriveData/retrive.js";
import { retriveImage } from "@/api/retriveData/retriveImage.js";
import { setProject } from "@/api/project/project.js";
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
    selectProject: null,
    projects: []
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
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
      state.events = await retrive("Calendar");
    },
    setSelectGame(state, val) {
      state.selectGame = val;
    },
    setSelectProject(state, val) {
      state.selectProject = val;
    },
    setProjects(state, value) {
      state.projects = value;
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
    loadProjects(context) {
      let pj = setProject();
      pj.get().then(res => context.commit("setProjects", res));
      console.log(pj);
    }
  },
  modules: {}
});
