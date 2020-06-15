<template>
  <v-app-bar
    color="primary"
    class="appbar"
    dense
    fixed
    app
    elevation="0"
    height="70"
  >
    <v-toolbar-title>
      <v-app-bar-nav-icon
        @click="drawerState(true)"
        class="hidden-lg-and-up"
      ></v-app-bar-nav-icon>
      <v-btn color="primary" text to="/">
        <h1 class="secondary--text">
          遊戲設計
        </h1>
      </v-btn>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-switch
      v-model="themeSwitch"
      label="Dark Mode"
      color="primary"
      class="darkThemeSwitch"
    ></v-switch>
    <v-toolbar-title class="hidden-md-and-down">
      <v-btn
        v-bind:color="getActivedPage === item.src ? 'btnColor' : 'secondary'"
        v-for="(item, index) in items"
        :key="index"
        text
        :to="item.src"
        class="mark"
      >
        {{ item.name }}
      </v-btn>
    </v-toolbar-title>
    <toolbar />
  </v-app-bar>
</template>

<script>
import toolbar from "@/components/appbar/toolbar.vue";
export default {
  name: "Appbar",
  props: ["drawer"],
  components: { toolbar },
  data() {
    return {
      themeSwitch: false,
      chosenBtn: "",
      items: [
        { name: "首頁", src: "/" },
        { name: "關於社團", src: "/about" },
        { name: "遊戲作品", src: "/games" },
        { name: "創作專案", src: "/teams" },
        { name: "社團行事曆", src: "/calendar" },
        { name: "聯絡我們", src: "/contact" },
        { name: "加入社團", src: "/join" }
      ]
    };
  },
  methods: {
    drawerState(val) {
      this.$emit("drawerState", val);
    },
    setActivedPage(val) {
      this.$store.commit("setActivedPage", val);
    }
  },
  computed: {
    getActivedPage() {
      return this.$store.state.activedPage;
    }
  },
  watch: {
    themeSwitch(newValue) {
      this.$vuetify.theme.dark = newValue;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap");
html,
body {
  font-family: "Noto Sans", sans-serif;
}
@media only screen and (max-width: 1263px) {
  .darkThemeSwitch {
    position: relative;
    top: 10px;
  }
}
@media only screen and (min-width: 1264px) {
  .appbar {
    padding: 0 8% 0 8%;
  }
  .v-btn:hover:before {
    color: transparent;
    border: none;
    border-radius: 0;
    border-color: transparent;
  }
  .mark:hover {
    background: linear-gradient(to top, #bbdefb 50%, transparent 50%);
    border-radius: 0;
  }
  .darkThemeSwitch {
    position: fixed;
    z-index: 1;
    top: 180px;
    left: -50px;
    transform: rotate(90deg);
  }
}
</style>
