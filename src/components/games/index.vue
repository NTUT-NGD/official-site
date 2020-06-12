<template>
  <v-app>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
        sm="6"
        lg="6"
        v-for="(item, index) in games"
        :key="index"
      >
        <v-img
          v-if="item.imgURL"
          :src="item.imgURL"
          aspect-ratio="1.7"
          class="pa-0"
        ></v-img>
        <v-skeleton-loader
          class="mx-auto"
          type="image"
          v-if="!item.imgURL"
        ></v-skeleton-loader>
        <v-card elevation="0">
          <v-card-title class="headline">
            <v-btn text class="pa-0" :to="'/games/' + item.name.toLowerCase()">
              <span>{{ item.name }}</span>
            </v-btn>
          </v-card-title>
          <v-card-text>
            License: {{ item.license }}
            <br />
            Recently update:
            {{ item.recentlyUpdate }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { retrive } from "@/api/retriveData/retrive.js";
import { retriveImage } from "@/api/retriveData/retriveImage.js";

export default {
  name: "Games",
  components: {},
  data() {
    return {
      games: []
    };
  },
  methods: {
    async setgames() {
      let vm = this;
      if (vm.getGames == null) {
        vm.games = await retrive("Games");
        vm.games.forEach(async element => {
          element.imgURL = await retriveImage(element);
        });
        vm.$store.commit("setGames", vm.games);
      } else {
        vm.games = vm.getGames;
      }
    }
  },
  mounted() {
    this.$store.commit("setActivedPage", "/games");
    this.setgames();
  },
  computed: {
    getGames() {
      return this.$store.state.games;
    }
  }
};
</script>
