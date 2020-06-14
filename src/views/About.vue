<template>
  <div>
    <v-container>
      <v-row justify="start">
        <v-col cols>
          <v-card-title>
            NTUT Adventure
          </v-card-title>
        </v-col>
      </v-row>
      <v-row justify="center">
        <game />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import game from "@/components/about/game.vue";
export default {
  name: "about",
  components: { game },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.$store.commit("setActivedPage", "/about");
    document.title = "About | NGC";
  },
  computed: {}
};
</script>
