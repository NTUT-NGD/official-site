<template>
  <div class="calendar">
    <v-container>
      <calendar />
      <post />
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
  },
  computed: {}
};
</script>
