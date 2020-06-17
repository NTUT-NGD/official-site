<template>
  <v-app>
    <v-container>
      <v-row justify="start">
        <v-col cols>
          <v-card-title>
            NTUT Adventure
          </v-card-title>
        </v-col>
      </v-row>
      <v-row justify="center">
        <game class="hidden-xs-only" />
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
  },
  computed: {}
};
</script>
