<template>
  <div></div>
</template>

<script>
export default {
  name: "about",
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.$store.commit("setActivedPage", "/about");
    document.title = "About | NGC";
  },
  computed: {}
};
</script>
