<template>
  <div class="home">
    <v-btn @click="login">Login</v-btn>
    <calendar />
  </div>
</template>

<script>
import { googleLogin } from "@/api/auth/googleLogin.js";
import calendar from "@/components/calendar/index.vue";
export default {
  name: "app",
  components: {
    calendar
  },
  data() {
    return {
      auth: null
    };
  },
  methods: {
    async login() {
      this.auth = await googleLogin();
    }
  },
  computed: {}
};
</script>
