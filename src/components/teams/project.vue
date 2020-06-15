<template>
  <div>a{{ data.name }}</div>
</template>

<script>
export default {
  name: "teams",
  props: ["data"],
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
