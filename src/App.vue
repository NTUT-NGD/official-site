<template>
  <v-app>
    <appbar :drawer="drawer" @drawerState="setDrawer" />
    <drawer
      :drawer="drawer"
      @drawerState="setDrawer"
      class="hidden-lg-and-up"
    />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import appbar from "@/components/appbar/index.vue";
import drawer from "@/components/appbar/drawer.vue";
export default {
  name: "App",
  data() {
    return {
      drawer: false
    };
  },
  components: {
    appbar,
    drawer
  },
  methods: {
    setDrawer(val) {
      this.drawer = val;
    }
  },
  computed: {
    getTheme() {
      return this.$store.state.darkTheme;
    }
  }
};
</script>
