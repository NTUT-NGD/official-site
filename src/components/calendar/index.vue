<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn outlined color="grey darken-2" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="#ef5350"
          :events="events"
          :event-color="getEventColor"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        ></v-calendar>
      </v-sheet>
    </v-col>
    <v-dialog
      v-model="selectedOpen"
      :close-on-content-click="false"
      :activator="selectedElement"
      max-width="500"
      class="primary"
    >
      <v-card min-width="350px" flat elevation="0">
        <v-toolbar elevation="0" color="primary" height="30">
          <v-spacer />
          <v-btn
            icon
            color="secondary"
            small
            style="position:relative;top:10px;left:-10px"
            @click="selectedOpen = false"
          >
            <v-icon>
              mdi-window-close
            </v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="primary">
          <v-row>
            <v-col cols="1">
              <v-icon :color="selectedEvent.color">mdi-checkbox-blank</v-icon>
            </v-col>
            <v-col cols="10">
              <h1 v-html="selectedEvent.name"></h1>
            </v-col>
          </v-row>
          <p style="position:relative;left:7px">
            {{ selectedEvent.start }} ~ {{ selectedEvent.end }}
          </p>
        </v-card-text>
        <v-card-text>
          <v-row>
            <v-col cols="1">
              <v-icon>mdi-comment-text-outline</v-icon>
            </v-col>
            <v-col cols="10">
              <span v-html="selectedEvent.details"></span>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text>
          <v-row v-if="selectedEvent.location">
            <v-col cols="1">
              <v-icon>mdi-map-marker</v-icon>
            </v-col>
            <v-col cols="10">
              <span v-html="selectedEvent.location"></span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1">
              <v-icon>mdi-calendar</v-icon>
            </v-col>
            <v-col cols="10">
              <span v-html="selectedEvent.poster"></span>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { retrive } from "@/api/retriveData/retrive.js";
export default {
  data() {
    return {
      duration: 5,
      recordDate: new Date(),
      today: new Date().toISOString().substr(0, 10),
      focus: "",
      type: "month",
      typeToLabel: {
        month: "Month",
        week: "Week",
        day: "Day"
      },
      start: null,
      end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1"
      ]
    };
  },
  components: {},
  computed: {
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);
      const startYear = start.year;
      const startDay = start.day + this.nth(start.day);

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  mounted() {
    this.$refs.calendar.checkChange();
    this.$store.commit("setActivedPage", "/Calendar");
    this.setEvents();
  },
  watch: {
    // events() {
    //   let vm = this;
    //   if (new Date() < vm.recordDate + vm.duration) return;
    //   vm.recordDate = new Date();
    //   vm.setEvents();
    // }
  },
  methods: {
    async setEvents() {
      this.events = await retrive("Calendar");
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    formatDate(a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() +
            1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
    }
  }
};
</script>
