<template>
  <v-app>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="8"
        md="8"
        lg="6"
        v-for="(item, index) in getGames"
        :key="index"
      >
        <router-link :to="'/games/' + item.name">
          <v-img
            v-if="item.imgURL"
            :src="item.imgURL"
            aspect-ratio="1.7"
            class="pa-0 ma-0"
            style="z-index:1"
          ></v-img>
        </router-link>
        <v-skeleton-loader
          class="mx-auto"
          type="image"
          v-if="!item.imgURL"
        ></v-skeleton-loader>
        <v-card elevation="0">
          <v-btn
            text
            class="pa-0"
            color="rgb(0, 0, 0, 0)"
            :to="'/games/' + item.name.toLowerCase()"
          >
            <h2 class="secondary--text">{{ item.name }}</h2>
          </v-btn>
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
export default {
  name: "Games",
  components: {},
  data() {
    return {
      games: []
    };
  },
  methods: {},
  mounted() {
    this.$store.commit("setActivedPage", "/games");
  },
  computed: {
    getGames() {
      return this.$store.state.games;
    }
  }
};
</script>
