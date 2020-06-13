<template>
  <v-app>
    <v-dialog
      v-model="getLoading"
      persistent
      content
      content-class="centered-dialog"
      fullscreen
      overlay-opacity="0"
    >
      <v-container fill-height>
        <v-row justify="center">
          <v-progress-circular
            indeterminate
            :size="70"
            :width="7"
            color="btnColor"
          ></v-progress-circular>
        </v-row>
      </v-container>
    </v-dialog>
    <appbar :drawer="drawer" @drawerState="setDrawer" />
    <drawer
      :drawer="drawer"
      @drawerState="setDrawer"
      class="hidden-lg-and-up"
    />
    <v-content style="height: 100vh; max-height: 100%;">
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
    getLoading() {
      return this.$store.state.pageLoading;
    }
  },
  mounted() {
    console.log(1);
  }
};
</script>
