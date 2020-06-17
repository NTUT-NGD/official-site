<template>
  <v-app>
    <v-container style="height: 100vh; max-height: 100%;">
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Games",
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.$store.commit("setActivedPage", "/games");
    document.title = "Games | NGC";
  },
  computed: {}
};
</script>
