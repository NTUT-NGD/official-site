import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#ffffff",
        secondary: "#263238",
        tertiary: "#eceff1",
        quaternary: "#212121",
        quinary: "#ffffff",
        btnColor: "#1565c0"
      },
      dark: {
        primary: "#212121",
        secondary: "#ffffff",
        tertiary: "#000000",
        quaternary: "#fafafa",
        quinary: "#ffffff",
        btnColor: "#eeffff"
      }
      //quaternary, quinary, senary, septenary, octonary, nonary,
    }
  }
});
