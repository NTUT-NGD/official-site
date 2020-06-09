<template>
  <div class="calendar">
    <v-container>
      <calendar />
    </v-container>
  </div>
</template>

<script>
import calendar from "@/components/calendar/index.vue";
export default {
  name: "Calendar",
  components: {
    calendar
  },
  data() {
    return {
      auth: null
    };
  },
  methods: {},
  mounted() {
    this.$store.commit("setActivedPage", "/Calendar");
  },
  computed: {}
};
</script>
