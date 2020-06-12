<template>
  <div class="home"></div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.$store.commit("setActivedPage", "/");
    document.title = "Home | NGC";
  },
  computed: {}
};
</script>
