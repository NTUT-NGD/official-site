<template>
  <v-navigation-drawer
    v-model="drawerState"
    v-if="resizeScreenSmallerThanLG"
    dark
    fixed
    app
  >
    <v-list dense>
      <v-list-item v-for="(item, index) in items" :key="index">
        <v-list-item-content>
          <v-list-item-title>
            <v-btn text small elevation rounded>
              {{ item.name }}
            </v-btn>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Drawer",
  props: ["drawer"],
  data() {
    return {
      items: [
        { name: "Explore" },
        { name: "About" },
        { name: "Games" },
        { name: "Team up" },
        { name: "Calendar" },
        { name: "Contact" }
      ]
    };
  },
  computed: {
    drawerState: {
      get() {
        return this.drawer;
      },
      set(val) {
        this.$emit("drawerState", val);
      }
    },
    resizeScreenSmallerThanLG() {
      return this.$vuetify.breakpoint.mdAndDown;
    }
  }
};
</script>

<style>
.v-navigation-drawer__content {
  top: 100%;
}
</style>
