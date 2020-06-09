<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="700px">
      <template v-slot:activator="{ on }">
        <v-btn
          outlined
          rounded
          class="mr-0"
          color="btnColor"
          @click="dialog = true"
          v-on="on"
          style="position:relative;float: right"
        >
          <v-icon class="pa-0" small style="position:relative;left:-3px"
            >mdi-plus</v-icon
          >
          建立
        </v-btn>
      </template>
      <v-form ref="form">
        <v-card>
          <v-card-text>
            <v-container>
              <v-text-field
                v-model="name"
                label="標題"
                prepend-icon="mdi-gamepad-variant"
                required
              ></v-text-field>
              <v-textarea
                label="內容"
                prepend-icon="mdi-comment-text-outline"
                v-model="details"
                name="內容"
              >
              </v-textarea>
              <v-text-field
                v-model="location"
                label="地點"
                prepend-icon="mdi-map-marker"
                required
              ></v-text-field>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="startDate"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="startDate"
                    label="開始時間"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  color="btnColor"
                  v-model="startDate"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="btnColor" @click="menu = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    text
                    color="btnColor"
                    @click="$refs.menu.save(startDate)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                :return-value.sync="endDate"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="endDate"
                    label="結束時間"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  color="btnColor"
                  v-model="endDate"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="btnColor" @click="menu1 = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    text
                    color="btnColor"
                    @click="$refs.menu1.save(endDate)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-menu
              ref="platte"
              v-model="platte"
              :close-on-content-click="false"
              :return-value.sync="showColor"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-btn :color="color" v-on="on">{{ showColor }}</v-btn>
              </template>
              <v-color-picker v-model="color"></v-color-picker>
            </v-menu>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false"
              >Close</v-btn
            >
            <v-btn color="blue darken-1" text @click="add()">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import { addEvent } from "@/api/calendar/addEvent.js";

export default {
  components: {},
  data() {
    return {
      hex: "#ffffff",
      name: "",
      details: "",
      poster: "NPC Game Design",
      location: "",
      color: "#ffffff",
      dialog: false,
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      platte: false,
      menu: false,
      menu1: false
    };
  },
  methods: {
    add() {
      this.dialog = false;
      let event = {
        name: this.name,
        details: this.details,
        start: this.startDate,
        end: this.endDate,
        poster: this.poster,
        location: this.location,
        color: this.color
      };
      addEvent(event);
    }
  },
  mounted() {},
  computed: {
    colorPlatte: {
      get() {
        return this[this.type];
      },
      set(v) {
        this[this.type] = v;
      }
    },
    showColor() {
      if (typeof this.color === "string") return this.color;

      return JSON.stringify(
        Object.keys(this.color).reduce((color, key) => {
          color[key] = Number(this.color[key].toFixed(2));
          return color;
        }, {}),
        null,
        2
      );
    }
  }
};
</script>
