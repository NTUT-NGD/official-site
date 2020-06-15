<template>
  <v-container>
    <v-data-table
      :footer-props="{
        'items-per-page-options': [8]
      }"
      disable-sort
      :headers="headers"
      :items="projects"
      @click:row="handClick"
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.intro }}</td>
          <td>{{ props.item.recruiting }}</td>
          <td>{{ props.item.platform }}</td>
          <td>{{ props.item.tags }}</td>
          <td>{{ props.item.inFinished }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" width="500" v-if="getAuth">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="btnColor"
          dark
          v-bind="attrs"
          v-on="on"
          text
          elevation="0"
        >
          <v-icon>
            mdi-plus
          </v-icon>
          create
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="primary" primary-title>
          創建新專案
          <v-spacer />
          <v-btn color="rgb(255, 0, 0, 0.0)" icon @click="dialog = false">
            <v-icon color="secondary">
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-text-field label="專案名稱" v-model="name" required>
          </v-text-field>
          <v-textarea label="專案介紹" v-model="intro" required></v-textarea>
          <v-text-field
            label="平台(Ex: PS4,Switch)"
            v-model="platform"
            required
          ></v-text-field>
          <v-text-field label="標籤(Ex: 2D,Unity)" v-model="tags" required>
          </v-text-field>
          <v-text-field
            label="Google Drive 連結"
            v-model="googleDriveUrl"
            required
          >
          </v-text-field>
          <v-text-field
            label="通訊平台連結(Line, DC.....)"
            v-model="contactUrl"
            required
          >
          </v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="createProject">
            確定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "teams",
  components: {},
  data() {
    return {
      dialog: false,
      name: "",
      intro: "",
      platform: "",
      tags: "",
      googleDriveUrl: "",
      contactUrl: "",
      page: 1,
      headers: [
        {
          text: "專案名稱",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "簡介", value: "intro" },
        { text: "平台", value: "platform" },
        { text: "標籤", value: "tags" },
        { text: "招募中", value: "recruiting" },
        { text: "完成", value: "inFinished" }
      ],
      projects: [
        {
          name: "Frozen Yogurt",
          intro: "簡單的小遊戲得斯",
          recruiting: "是",
          tags: ["2D"],
          platform: ["PS4", "Switch"],
          inFinished: "否",
          parties: [{ name: "PlayerA" }, { name: "PlayerB" }],
          googleDriveUrl: "https://drive.google.com/drive/my-drive",
          contactUrl: "https://discord.com/"
        }
      ]
    };
  },
  methods: {
    createProject() {
      console.log("create project");
    },
    handClick(value) {
      this.$store.dispatch("dispatchSelectProject", value);
      this.$router.push({
        name: "project"
      });
    }
  },
  mounted() {
    this.$store.commit("setActivedPage", "/teams");
    document.title = "Team | NGC";
  },
  computed: {
    getAuth() {
      return this.$store.state.user;
    }
  }
};
</script>

<style>
@media only screen and (min-width: 600px) {
  td {
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
