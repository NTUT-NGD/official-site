<template>
  <v-container>
    <router-view></router-view>
  </v-container>
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
