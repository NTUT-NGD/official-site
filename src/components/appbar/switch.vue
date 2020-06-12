<template>
  <v-app>
    <v-switch
      v-model="themeSwitch"
      label="Dark Mode"
      color="primary"
      class="darkThemeSwitch"
    ></v-switch>
  </v-app>
</template>

<script>
export default {
  name: "themeSwitch",
  data() {
    return {
      themeSwitch: false
    };
  },
  methods: {},
  watch: {
    themeSwitch(newValue) {
      this.$vuetify.theme.dark = newValue;
    },
    switchState() {
      this.themeSwitch = this.themeSwitch == true ? true : false;
    }
  },
  computed: {},
  mounted() {
    this.setSwitch();
  }
};
</script>

<style>
@media only screen and (min-width: 1264px) {
  .darkThemeSwitch {
    position: fixed;
    z-index: 1;
    top: 180px;
    left: -50px;
    transform: rotate(90deg);
  }
}
</style>
