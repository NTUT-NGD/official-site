<template>
  <div class="home">
    <v-container>
      <v-carousel
        class="quaternary"
        :delimiter-icon="icons[0].icon"
        hide-delimiter-background
        cycle
        show-arrows-on-hover
        continuous
        height="100%"
      >
        <v-carousel-item
          v-for="(item, i) in getGames"
          :key="i"
          :to="'/games/' + item.name.toLowerCase()"
        >
          <v-row justify="center">
            <v-col cols="12" lg="8">
              <v-img
                :src="item.imgURL"
                max-width="1000"
                min-height="300"
                max-height="500"
              >
              </v-img>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
      <hr />
    </v-container>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      selectIcon: "mdi-delta",
      icons: [
        { icon: "mdi-delta" },
        { icon: "mdi-checkbox-blank-outline" },
        { icon: "mdi-circle-outline" },
        { icon: "mdi-close" },
        "mdi-gamepad"
      ]
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
