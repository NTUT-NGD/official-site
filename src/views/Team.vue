<template>
  <v-container>
    <router-view></router-view>
  </v-container>
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
  },
  computed: {}
};
</script>
