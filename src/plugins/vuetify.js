import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#ffffff",
        secondary: "#263238",
        priCard: "#D7DCDE",
        secCard: "#3E516E",
        thrCard: "#3E516E",
        forCard: "#8891A1",
        cardHeader: "#1976d2",
        cardFooter: "#ef9a99",
        cardContent: "#64b5f6"
      },
      dark: {
        primary: "#263238",
        secondary: "#263238",
        priCard: "#D7DCDE",
        secCard: "#3E516E",
        thrCard: "#3E516E",
        forCard: "#8891A1",
        cardHeader: "#1976d2",
        cardFooter: "#ef9a99",
        cardContent: "#64b5f6"
      }
    }
  }
});
