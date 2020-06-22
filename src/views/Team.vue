<template>
  <v-app id="Team">
    <v-container>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "teams",
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.$store.commit("setActivedPage", "/teams");
    document.title = "Team | NGC";
    this.$vuetify.goTo("#Team");
  },
  computed: {}
};
</script>
