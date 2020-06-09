<template>
  <div>about</div>
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
    this.$store.commit("setActivedPage", "/About");
  },
  computed: {}
};
</script>
