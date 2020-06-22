<template>
  <v-app>
    <v-container class="join" id="Join">
      <joinForm />
    </v-container>
  </v-app>
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
    this.$vuetify.goTo("#Join");
  }
};
</script>
