<template>
  <div>game</div>
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
    this.$store.commit("setActivedPage", "/Games");
  },
  computed: {}
};
</script>
