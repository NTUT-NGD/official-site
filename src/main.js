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
const ignoredMessage = [
  "TypeError: v is undefined",
  "The Same Origin Policy disallows reading the remote resource at https://docs.google.com/forms/u/0/d/e/1FAIpQLSfQ30GpXUP0PaLdu-KDquuLB_NNcJeVa8siFMybIwAnfvcs7g/formResponse. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing)."
];

const ignoredMessage1 =
  "main.js?56d7:35 The .native modifier for v-on is only valid on components but it was used on <div>.";

Vue.config.warnHandler = (message, vm, componentTrace) => {
  if (message !== ignoredMessage && ignoredMessage1) {
    console.error(message + componentTrace);
  }
};
