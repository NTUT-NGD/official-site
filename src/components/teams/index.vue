<template>
  <v-app id="Team">
    <v-data-table
      :footer-props="{
        'items-per-page-options': [8]
      }"
      disable-sort
      :headers="headers"
      :items="projects"
      @click:row="handClick"
      loading="true"
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.intro }}</td>
          <td>{{ props.item.platform }}</td>
          <td>{{ props.item.tags }}</td>
          <td>{{ props.item.recruiting }}</td>
          <td>{{ props.item.inFinished }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog
      v-model="dialog"
      width="500"
      v-if="getAuth && getAuth[1][0].isMember"
    >
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

      <v-form ref="form" id="form" v-model="valid" lazy-validation>
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
            <v-text-field
              label="專案名稱"
              v-model="formData.name"
              :rules="rules"
              required
            >
            </v-text-field>
            <v-textarea
              label="專案介紹"
              v-model="formData.intro"
              :rules="rules"
              required
            ></v-textarea>
            <v-text-field
              label="平台(Ex: PS4,Switch)"
              v-model="formData.platform"
              :rules="rules"
              required
            ></v-text-field>
            <v-text-field
              label="標籤(Ex: 2D,Unity)"
              v-model="formData.tags"
              :rules="rules"
              required
            >
            </v-text-field>
            <v-text-field
              label="Google Drive 連結"
              v-model="formData.googleDriveUrl"
              :rules="rules"
              required
            >
            </v-text-field>
            <v-text-field
              label="通訊平台連結(Line, DC.....)"
              v-model="formData.contactUrl"
              :rules="rules"
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
      </v-form>
    </v-dialog>
  </v-app>
</template>

<script>
import { doCreate } from "@/api/teams/teamAPI.js";
import { retrive } from "@/api/retriveData/retrive.js";

export default {
  name: "teams",
  components: {},
  data() {
    return {
      duration: 5,
      recordDate: new Date(),
      valid: true,
      dialog: false,
      formData: {
        name: "",
        intro: "",
        platform: "",
        tags: "",
        googleDriveUrl: "",
        contactUrl: "",
        members: [],
        applicants: [],
        recruiting: "是",
        inFinished: "否",
        createDate: new Date()
      },
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
        // {
        //   name: "Frozen Yogurt",
        //   intro: "簡單的小遊戲得斯",
        //   recruiting: "是",
        //   tags: ["2D"],
        //   platform: ["PS4", "Switch"],
        //   inFinished: "否",
        //   parties: [{ name: "PlayerA" }, { name: "PlayerB" }],
        //   googleDriveUrl: "https://drive.google.com/drive/my-drive",
        //   contactUrl: "https://discord.com/"
        // }
      ],
      rules: [v => !!v || "Required"]
    };
  },
  methods: {
    async createProject() {
      let vm = this;
      if (vm.$refs.form.validate()) {
        vm.formData.members.push({
          uid: vm.getAuth[0].uid,
          email: vm.getAuth[0].email,
          name: vm.getAuth[0].displayName,
          job: "leader"
        });
        doCreate(vm.formData);
        vm.dialog = false;
        this.$refs.form.reset();
        vm.projects = await retrive("Projects");
      }
    },
    handClick(value) {
      this.$store.dispatch("dispatchSelectProject", value);
      this.$router.push({
        name: "project"
      });
    },
    async setProjects() {
      let vm = this;
      vm.projects = await retrive("Projects");
    }
  },
  mounted() {
    this.$store.commit("setActivedPage", "/teams");
    document.title = "Team | NGC";
    this.$vuetify.goTo("#Team");
    this.setProjects();
  },
  computed: {
    getAuth() {
      return this.$store.state.user;
    }
  },
  watch: {
    projects() {
      let vm = this;
      if (vm.recordDate > new Date() + vm.duration) {
        vm.recordDate = new Date();
        vm.setProjects();
      }
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
