<template>
  <div class="sidebar">
    <div class="sidebar-r">
      <v-btn
        icon
        color="rgb(0, 0, 0, 0)"
        @click="sigin()"
        style="position:relative;left:30px"
      >
        <v-icon class="side-icon" color="quaternary">mdi-google-chrome</v-icon>
        <span class="contact-text quaternary--text" v-if="getUser">{{
          getUser[0].displayName
        }}</span>
        <span class="contact-text quaternary--text" v-else>Login</span>
      </v-btn>
      <v-btn
        color="rgb(0, 0, 0, 0)"
        icon
        style="position:relative;top:120px;transform: rotate(270deg);"
        href="https://www.facebook.com/groups/2620701194872277/"
      >
        <v-icon size="24px" color="quaternary">mdi-facebook</v-icon>
      </v-btn>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">登出</v-card-title>
          <v-card-actions
            ><v-btn color="btnColor" text @click="singout()">
              Agree
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="btnColor" text @click="dialog = false">
              Disagree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    sigin() {
      let vm = this;
      if (vm.getUser) {
        vm.dialog = true;
        return;
      }
      vm.$store.dispatch("userSignIn");
    },
    singout() {
      let vm = this;
      vm.dialog = false;
      vm.$store.dispatch("userSignOut");
    }
  },
  computed: {
    getUser() {
      return this.$store.state.user;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Baloo+Paaji+2:wght@500&family=Noto+Sans:wght@700&display=swap");
.sidebar {
  position: fixed;
  z-index: 999;
}
.sidebar-l {
  position: fixed;
  top: 35%;
  left: 2%;
}
.sidebar-r {
  position: fixed;
  top: 150px;
  right: 3%;
}
.side-icon {
  position: relative;
}
.contact-text {
  position: relative;
  left: 10px;
  writing-mode: vertical-lr;
  text-orientation: mi;
  transform: rotate(0deg);
  letter-spacing: 3px;
}
.contact-text-r {
  font-size: 12px;
  font-family: "Noto Sans", cursive;
  position: relative;
  top: 2%;
  writing-mode: vertical-lr;
  letter-spacing: 3px;
}
.en-span {
  writing-mode: horizontal-tb;
  letter-spacing: 1px;
}
</style>
