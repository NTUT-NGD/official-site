<template>
  <v-app>
    <v-row
      v-for="(item, index) in games"
      :key="index"
      justify="center"
      class="mr-4"
    >
      <v-col cols="12" sm="4" lg="4">
        <div>
          <v-img
            :src="require('@/assets/test.png')"
            aspect-ratio="1.7"
            max-width="400"
          ></v-img>
        </div>
      </v-col>
      <v-col cols="12" sm="4" lg="4">
        <v-card class="elevation-2" elevation="0">
          <v-card-title class="headline">{{ item.name }}</v-card-title>
          <v-card-text>
            {{ item.info }}
          </v-card-text>
          <v-card-text>
            <v-row>
              <v-col cols="1">
                <v-icon color="secondary" large>mdi-github</v-icon>
              </v-col>
              <v-col cols="1">
                <v-icon color="secondary" large>mdi-message-image</v-icon>
              </v-col>
            </v-row>
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
      games: [
        {
          name: "Ping Pong",
          info: "簡易的乒乓球互動小遊戲，藉由雙人與單人模式",
          github: "https://github.com/AaronXue0/Unity-Mini-Game-One",
          materials:
            "https://hugues-laborde.itch.io/pack-character-pixel-art-05",
          license: "MIT License",
          img: null
        }
      ]
    };
  },
  methods: {},
  mounted() {
    this.$store.commit("setActivedPage", "/games");
  },
  computed: {}
};
</script>
