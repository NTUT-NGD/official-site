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
          建立活動
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
              <v-row>
                <v-col cols="12" lg="6" xl="6">
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
                </v-col>
                <v-col cols="12" lg="6" xl="6">
                  <v-menu
                    ref="menuTime1"
                    v-model="menuTime1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="startTime"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="startTime"
                        label="開始時間"
                        prepend-icon="mdi-clock"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      color="secondary"
                      v-if="menuTime1"
                      v-model="startTime"
                      full-width
                      @click:minute="$refs.menuTime1.save(startTime)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col scols="12" lg="6" xl="6">
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
                </v-col>
                <v-col cols="12" lg="6" xl="6">
                  <v-menu
                    ref="menuTime2"
                    v-model="menuTime2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="endTime"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="endTime"
                        label="結束時間"
                        prepend-icon="mdi-clock"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      color="secondary"
                      v-if="menuTime2"
                      v-model="endTime"
                      full-width
                      @click:minute="$refs.menuTime2.save(endTime)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>
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
                <v-icon :color="color">mdi-square</v-icon>
                <v-btn :color="color" outlined v-on="on" elevation="0">{{
                  showColor
                }}</v-btn>
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
      name: "",
      details: "",
      location: "",
      color: "#000000",
      hex: "#000000",
      dialog: false,
      startTime: new Date().getHours() + ":" + new Date().getMinutes(),
      endTime: new Date().getHours() + ":" + new Date().getMinutes(),
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      platte: false,
      menu: false,
      menu1: false,
      menuTime1: false,
      menuTime2: false
    };
  },
  methods: {
    add() {
      let vm = this;
      vm.dialog = false;
      let event = {
        name: vm.name,
        details: vm.details,
        start: vm.startDate + " " + vm.startTime,
        end: vm.endDate + " " + vm.endTime,
        poster: vm.getUser[0].displayName,
        location: vm.location,
        color: vm.color
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
    },
    getUser() {
      return this.$store.state.user;
    }
  }
};
</script>
