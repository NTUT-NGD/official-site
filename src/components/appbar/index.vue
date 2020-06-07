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
        <h2 class="secondary--text">
          遊戲設計
        </h2>
      </v-btn>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-title class="hidden-md-and-down">
      <v-btn v-for="(item, index) in items" :key="index" text :to="item.src">
        {{ item.name }}
      </v-btn>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "Appbar",
  props: ["drawer"],
  data() {
    return {
      items: [
        { name: "Explore", src: "/" },
        { name: "About", src: "/About" },
        { name: "Games", src: "/Games" },
        { name: "Team up", src: "/Teams" },
        { name: "Calendar", src: "/Calendar" },
        { name: "Contact", src: "/Contact" }
      ]
    };
  },
  methods: {
    drawerState(val) {
      this.$emit("drawerState", val);
    }
  },
  computed: {}
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap");
html,
body {
  font-family: "Noto Sans", sans-serif;
}
@media only screen and (min-width: 1264px) {
  .appbar {
    padding: 0 10% 0 10%;
  }
}
</style>
