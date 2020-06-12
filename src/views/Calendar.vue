<template>
  <div class="calendar">
    <v-container>
      <calendar />
      <post v-if="getAuth && getAdmin" />
    </v-container>
  </div>
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
