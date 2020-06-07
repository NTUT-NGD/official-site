import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";
import config from "./firebaseConfig.js";
import VueGAPI from "vue-gapi";
import gconfig from "./googleConfig.js";

Vue.config.productionTip = false;
firebase.initializeApp(config);
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

Vue.use(VueGAPI, gconfig);

//Ignore error fomr .native
const ignoredMessage =
  "The .native modifier for v-on is only valid on components but it was used on <div>.";

Vue.config.warnHandler = (message, vm, componentTrace) => {
  if (message !== ignoredMessage) {
    console.error(message + componentTrace);
  }
};
