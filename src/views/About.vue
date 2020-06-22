<template>
  <v-app id="About">
    <v-container>
      <v-row justify="center">
        <v-card-title>
          <v-btn
            icon
            x-large
            color="rgb(255, 0, 0, 0.0)"
            @click="$vuetify.goTo('#game')"
          >
            <span class="secondary--text">NTUT Adventure</span>
            <v-icon color="red">
              mdi-chevron-down
            </v-icon></v-btn
          >
        </v-card-title>
      </v-row>
      <v-row justify="center">
        <game class="hidden-xs-only" id="game" />
        <v-col cols="12" class="hidden-sm-and-up">
          <div style="border: 1px dashed black;" class="pa-5">
            <p>Dialog</p>
            <p>
              There is a secret on larger screen.......
            </p>
            <p>
              About who we are.......
            </p>
            <p>
              Take the adventure.......
            </p>
            <p>
              And find out the truth.......
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import game from "@/components/about/game.vue";
export default {
  name: "about",
  components: { game },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.$store.commit("setActivedPage", "/about");
    document.title = "About | NGC";
    this.$vuetify.goTo("#About");
  },
  computed: {}
};
</script>
