<template>
  <v-switch
    v-model="themeSwitch"
    label="Dark Mode"
    color="primary"
    class="darkThemeSwitch"
  ></v-switch>
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
    }
  },
  computed: {}
};
</script>

<style>
.darkThemeSwitch {
  position: fixed;
  z-index: 1;
  top: 15%;
  left: -50px;
  transform: rotate(90deg);
}
</style>
