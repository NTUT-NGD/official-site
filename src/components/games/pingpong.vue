<template>
  <v-app>
    <v-row justify="center">
      <v-col cols="12" md="6" sm="6" lg="6">
        <v-card elevation="0">
          <v-card-title class="headline">
            <h1 style="position:relative;left:-20px">
              {{ game.name }}<v-card-text>{{ game.madeBy }}</v-card-text>
            </h1>
          </v-card-title>
          <v-card-title>
            <h5 style="font-size:15px">{{ game.content }}</h5>
          </v-card-title>
          <v-card-title>
            <v-btn fab icon color="primary">
              <v-icon color="btnColor" x-large>mdi-github</v-icon>
            </v-btn>
            <v-btn fab icon color="primary">
              <v-icon color="btnColor" x-large>mdi-image</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" sm="6" lg="6">
        <v-img v-if="game.imgURL" :src="game.imgURL" aspect-ratio="1.7"></v-img>
        <v-skeleton-loader
          class="mx-auto"
          type="image"
          v-if="!game.imgURL"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: "Games",
  components: {},
  data() {
    return {
      name: "pingpong",
      game: []
    };
  },
  methods: {
    async setGame() {
      let vm = this;
      let games = vm.getGames;
      games.forEach(element => {
        if (element.name.toLowerCase() == vm.name.toLowerCase()) {
          vm.game = element;
        }
      });
    }
  },
  mounted() {
    this.setGame();
  },
  computed: {
    getGames() {
      return this.$store.state.games;
    }
  }
};
</script>
