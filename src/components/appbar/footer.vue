<template>
  <v-card flat tile width="100%" class="primary text-center">
    <v-card-text>
      <v-btn class="mx-4" color="rgb(0, 0, 0, 0)" icon>
        <v-icon size="24px" color="quaternary">{{ mdi - facebook }}</v-icon>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      icons: ["mdi-facebook"]
    };
  }
};
</script>
