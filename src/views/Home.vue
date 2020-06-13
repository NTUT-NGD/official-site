<template>
  <div class="home">
    <v-container>
      <v-carousel
        hide-delimiters
        cycle
        show-arrows-on-hover
        height="100%"
        aspect-ratio="1.7"
      >
        <v-carousel-item
          v-for="(item, i) in getGames"
          :key="i"
          :to="'/games/' + item.name.toLowerCase()"
        >
          <v-img :src="item.imgURL" width="100%" height="100%"> </v-img>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      slideIndex: 1
    };
  },
  methods: {},
  mounted() {
    this.$store.commit("setActivedPage", "/");
    document.title = "Home | NGC";
  },
  computed: {
    getGames() {
      return this.$store.state.games;
    }
  }
};
</script>

<style></style>
