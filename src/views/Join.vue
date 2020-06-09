<template>
  <div class="join">
    <joinForm />
  </div>
</template>

<script>
import joinForm from "@/components/forms/join.vue";
export default {
  name: "Join",
  components: { joinForm },
  methods: {},
  mounted() {
    this.$store.commit("setActivedPage", "/Join");
  }
};
</script>
