<template>
  <div></div>
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
  },
  computed: {}
};
</script>
