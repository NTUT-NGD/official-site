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
        { name: "首頁", src: "/" },
        { name: "關於社團", src: "/About" },
        { name: "遊戲作品", src: "/Games" },
        { name: "創作專案", src: "/Teams" },
        { name: "社團行事曆", src: "/Calendar" },
        { name: "聯絡資訊", src: "/Contact" }
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
    padding: 0 8% 0 8%;
  }
}
</style>
