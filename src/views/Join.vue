<template>
  <v-container class="join">
    <joinForm />
  </v-container>
</template>

<script>
import joinForm from "@/components/forms/join.vue";
export default {
  name: "Join",
  components: { joinForm },
  methods: {},
  mounted() {
    this.$store.commit("setActivedPage", "/join");
    document.title = "Join | NGC";
  }
};
</script>
