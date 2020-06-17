<template>
  <div>
    <v-row v-for="(item, index) in getGames" :key="index">
      <v-col cols="12" md="6" sm="6" lg="6" v-if="item.name == name">
        <h1
          style="position:relative;left:-20px;font-size:50px"
          class="text-right"
        >
          <span class="hidden-sm-and-up caption">{{ item.madeBy }}</span>
          {{ item.name }}
        </h1>
        <p
          class="hidden-xs-only text-right"
          style="position:relative;left:-20px;"
        >
          {{ item.madeBy }}
        </p>
        <v-card-title>
          <h5 style="font-size:15px" class="hidden-sm-and-up">
            {{ item.content }}
          </h5>
        </v-card-title>
        <h5 style="font-size:15px" class="text-right hidden-xs-only">
          {{ item.content }}
        </h5>
      </v-col>
      <v-col cols="12" md="6" sm="6" lg="6" v-if="item.name == name">
        <v-row class="d-flex flex-row-reverse">
          <v-btn icon color="primary" :href="item.github">
            <v-icon color="secondary">
              mdi-github
            </v-icon>
          </v-btn>
          <v-btn icon color="primary" :href="item.materials">
            <v-icon color="secondary">
              mdi-image
            </v-icon>
          </v-btn>
        </v-row>

        <v-img
          v-if="item.imgURL"
          style="position:relative;z-index:1"
          :src="item.imgURL"
          aspect-ratio="1.7"
        ></v-img>
        <v-skeleton-loader
          class="mx-auto"
          type="image"
          v-if="!item.imgURL"
        ></v-skeleton-loader>
        <div
          class="hidden-xs-only"
          style="z-index:0;position:relative;top:-10%;left:-10%"
        >
          <div
            class="quaternary d-flex align-end mb-6"
            style="height:100px;width:300px"
          >
            <span
              style="font-size:15px;position:relative;top:-10px;left:15px"
              class="tertiary--text"
              >{{ item.license }}
            </span>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Games",
  components: {},
  data() {
    return {
      name: "PingPong",
      game: []
    };
  },
  methods: {},
  mounted() {},
  computed: {
    getGames() {
      return this.$store.state.games;
    }
  }
};
</script>
