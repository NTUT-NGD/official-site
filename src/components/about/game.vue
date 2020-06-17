<template>
  <v-app>
    <canvas
      ref="board"
      width="640"
      height="480"
      style="border: 1px solid black;"
    ></canvas>
    <v-btn @click="reset()" color="Secondary" text>Reset</v-btn>
    <v-row>
      <v-col cols="12">
        <div style="border: 1px dashed black;" class="pa-5">
          <p>Dialog</p>
          <p v-for="(item, index) in dialog" :key="index">{{ item }}</p>
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { building } from "@/api/aboutGame/building.js";
// import io from "socket.io-client";
export default {
  name: "about",
  components: {},
  data() {
    return {
      keywords: "",
      dialog: [
        "????????????????????????????????????????????????????????????????????????"
      ],
      socket: {},
      context: {},
      position: {
        x: 450,
        y: 100,
        w: 20,
        h: 20,
        originX: 450,
        originY: 100
      },
      builds: []
    };
  },
  created() {
    // this.socket = io("http://localhost:3000");
    window.addEventListener("keydown", this.clickEvent);
  },
  methods: {
    clickEvent(e) {
      // console.log(1);
      switch (e.key) {
        case "w":
          this.move("up");
          break;
        case "s":
          this.move("down");
          break;
        case "a":
          this.move("left");
          break;
        case "d":
          this.move("right");
          break;
      }
    },
    move(direction) {
      let movement = 20;
      switch (direction) {
        case "right":
          this.position.x += movement;
          break;
        case "left":
          this.position.x -= movement;
          break;
        case "up":
          this.position.y -= movement;
          break;
        case "down":
          this.position.y += movement;
          break;
      }
      this.collidingDetect();
      this.doDraw();
    },
    reset() {
      this.position.x = this.position.originX;
      this.position.y = this.position.originY;
      this.doDraw();
      this.collidingDetect();
    },
    collidingDetect() {
      let trigger = false;
      this.builds.forEach(element => {
        if (this.rectsColliding(this.position, element)) {
          this.dialog = element.infos;
          trigger = true;
        }
      });
      if (trigger == false)
        this.dialog = [
          "????????????????????????????????????????????????????????????????????????"
        ];
    },
    doDraw() {
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
    },
    rectsColliding(rect1, rect2) {
      return (
        rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y
      );
    }
  },
  mounted() {
    this.$store.commit("setActivedPage", "/about");
    document.title = "About | NGC";
    this.builds = building;
    this.context = this.$refs.board.getContext("2d");
    this.doDraw();
  },
  computed: {}
};
</script>
