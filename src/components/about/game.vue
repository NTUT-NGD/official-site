<template>
  <div>
    <canvas
      ref="board"
      width="640"
      height="480"
      style="border: 2px solid black;"
    ></canvas>
    <br />
    <v-row>
      <v-col cols="10">
        <v-btn v-on:click="move('right')" color="Secondary" text>Right</v-btn>
        <v-btn v-on:click="move('left')" color="Secondary" text>left</v-btn>
        <v-btn v-on:click="move('up')" color="Secondary" text>up</v-btn>
        <v-btn v-on:click="move('down')" color="Secondary" text>down</v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn @click="reset()" color="Secondary" text>Reset</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div style="border: 1px dashed black;" class="pa-5">
          <p>Dialog</p>
          <p>{{ dialog }}</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "about",
  components: {},
  data() {
    return {
      dialog:
        "????????????????????????????????????????????????????????????????????????",
      socket: {},
      context: {},
      position: {
        x: 0,
        y: 0
      }
    };
  },
  created() {
    this.socket = io("http://localhost:3000");
  },
  methods: {
    move(direction) {
      this.socket.emit("move", direction);
    },
    reset() {
      this.socket.emit("reset");
    }
  },
  mounted() {
    this.$store.commit("setActivedPage", "/about");
    document.title = "About | NGC";
    //Socket.io
    this.context = this.$refs.board.getContext("2d");
    this.context = this.$refs.board.getContext("2d");
    this.socket.on("position", data => {
      this.position = data;
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
      this.context.fillStyle = "#e53935";
      this.context.fillRect(205, 100, 50, 50);
      this.context.fillStyle = "#3949ab";
      this.context.fillRect(305, 100, 50, 50);
      this.context.fillStyle = "#ffb300";
      this.context.fillRect(405, 100, 50, 50);
      this.context.fillStyle = "#000000";
      this.context.fillRect(this.position.x, this.position.y, 20, 20);
    });
  },
  computed: {}
};
</script>
