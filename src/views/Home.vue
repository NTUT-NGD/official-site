<template>
  <div class="home">
    <calendar />
  </div>
</template>

<script>
import calendar from "@/components/calendar/index.vue";
export default {
  name: "app",
  components: {
    calendar
  },
  data() {
    return {};
  },

  computed: {}
};
</script>
