<template>
  <v-app class="home">
    <v-container>
      <v-row>
        <h1 class="about-title text-left">
          No Game, No Life <br />
          <h1 class="about-title-mirror text-left">No Game, No Life</h1>
        </h1>
        <v-carousel
          v-if="getGames"
          class="quinary"
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
            v-on:click.native="handleClick(item)"
            :to="'/games/game'"
            ><v-row justify="center">
              <v-col cols="12"> </v-col>
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
      </v-row>
    </v-container>
    <v-row justify="center">
      <v-btn
        icon
        x-large
        color="rgb(255, 0, 0, 0.0)"
        @click="$vuetify.goTo('#aboutGame')"
      >
        <v-icon color="secondary">
          mdi-chevron-down
        </v-icon>
        <span class="secondary--text">Try our adventure game on " About "</span>
        <v-icon color="secondary">
          mdi-chevron-down
        </v-icon>
      </v-btn>
    </v-row>
    <v-container id="aboutGame">
      <v-row justify="center">
        <div class="hidden-xs-only">
          <canvas
            ref="board"
            width="640"
            height="480"
            style="border: 1px solid black;"
          ></canvas>
        </div>
        <v-col cols="12">
          <div style="border: 1px dashed black;" class="pa-5 hidden-sm-and-up">
            <p>Dialog</p>
            <p>
              臺北科技大學 ｜ 遊戲設計社
            </p>
            <p>
              成立於：2020/03/15
            </p>
            <p>
              我們致力於遊戲的設計與開發, 跨系合作
            </p>
            <p>
              平常會舉辦遊戲的交流會、Game Jam
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { building } from "@/api/aboutGame/building.js";
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
      ],
      position: {
        x: 50,
        y: 200,
        w: 20,
        h: 20,
        originX: 200,
        originY: 200
      },
      builds: []
    };
  },
  methods: {
    handleClick(val) {
      this.$store.dispatch("dispatchSelectGame", val);
    },
    doDraw() {
      this.context = this.$refs.board.getContext("2d");
      this.context.clearRect(
        0,
        0,
        this.$refs.board.width,
        this.$refs.board.height
      );
      this.context.fillStyle = "#FFFFFF";
      this.context.fillRect(
        0,
        0,
        this.$refs.board.width,
        this.$refs.board.width
      );
      this.builds.forEach(element => {
        this.context.fillStyle = element.color;
        this.context.fillRect(element.x, element.y, element.w, element.h);
      });
      this.context.fillStyle = "#ffb300";
      this.context.fillRect(
        this.position.x,
        this.position.y,
        this.position.w,
        this.position.h
      );
    }
  },
  mounted() {
    this.$store.commit("setActivedPage", "/");
    document.title = "Home | NGC";
    this.builds = building;
    this.doDraw();
  },
  computed: {
    getGames() {
      return this.$store.state.games;
    }
  }
};
</script>

<style>
.about-title {
  position: relative;
  font-size: 45px;
}
.about-title-mirror {
  position: relative;
  top: -30px;
  opacity: 0.1;
  font-size: 45px;
}
</style>
