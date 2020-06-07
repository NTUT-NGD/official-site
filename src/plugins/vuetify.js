import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#ffffff",
        secondary: "#263238",
        btnColor: "#1565c0"
      },
      dark: {
        primary: "#263238",
        secondary: "#ffffff",
        btnColor: "#1565c0"
      }
    }
  }
});
