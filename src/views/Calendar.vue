<template>
  <v-app class="calendar" id="Calendar">
    <v-container>
      <calendar />
      <post v-if="getAuth && getAdmin" />
    </v-container>
  </v-app>
</template>

<script>
import post from "@/components/calendar/postNewEvent.vue";
import calendar from "@/components/calendar/index.vue";

export default {
  name: "Calendar",
  components: {
    post,
    calendar
  },
  data() {
    return {
      auth: null
    };
  },
  methods: {},
  mounted() {
    this.$store.commit("setActivedPage", "/calendar");
    document.title = "Calendar | NGC";
    this.$vuetify.goTo("#Calendar");
  },
  computed: {
    getAuth() {
      return this.$store.state.user;
    },
    getAdmin() {
      return this.$store.state.isAdmin;
    }
  }
};
</script>
