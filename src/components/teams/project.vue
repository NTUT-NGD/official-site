<template>
  <v-app v-if="getProject" id="Team" class="pa-0">
    <v-row justify="center">
      <v-col cols="11" sm="6" md="6" lg="6" xl="6">
        <v-card elevation="0">
          <v-card-title>
            <p>專案名稱：{{ getProject.name }}</p>
          </v-card-title>
          <v-card-subtitle>
            <p>專案介紹：{{ getProject.intro }}</p>
            <p v-if="getLeader === false && getMember === false">
              招募中：
              <v-dialog
                v-model="dialog"
                width="500"
                v-if="getProject.recruiting === '是'"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="btnColor"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    text
                    elevation="0"
                    v-if="getAuth"
                  >
                    申請加入
                  </v-btn>
                  <span v-else>請先登入</span>
                </template>
                <v-card>
                  <v-card-title class="primary" primary-title>
                    申請加入這個專案
                    <v-spacer />
                    <v-btn
                      color="rgb(255, 0, 0, 0.0)"
                      icon
                      @click="dialog = false"
                    >
                      <v-icon color="secondary">
                        mdi-close
                      </v-icon>
                    </v-btn>
                  </v-card-title>

                  <v-card-text>
                    <v-textarea
                      v-model="introduction"
                      label="請輸入自我介紹（專長、個性、建議或任何您想說的話）"
                    >
                    </v-textarea>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="secondary" text @click="apply">
                      送出
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <span v-else>停止招募</span>
            </p>
          </v-card-subtitle>
          <v-card-actions>
            <v-treeview :items="items"></v-treeview>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="getAuth && getMember" justify="center">
      <v-col cols="11" sm="6" md="6" lg="6" xl="6">
        <v-card elevation="0">
          <v-card-title>
            <p>成員專區</p>
          </v-card-title>
          <v-card-text>
            <p>
              Google Drive:<v-btn
                text
                color="rgb(255, 0, 0, 0.0)"
                :href="getProject.googleDriveUrl"
              >
                <span class="secondary--text">
                  素材連結
                </span></v-btn
              >
            </p>
            <p>
              Contact Url:
              <v-btn
                text
                color="rgb(255, 0, 0, 0.0)"
                :href="getProject.contactUrl"
              >
                <span class="secondary--text">
                  討論平台
                </span></v-btn
              >
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="getAuth && getLeader" justify="center">
      <v-col cols="11" sm="6" md="6" lg="6" xl="6">
        <v-card elevation="0">
          <v-card-title>
            <p>申請名單</p>
          </v-card-title>
          <div v-if="applicants.length > 0">
            <div v-for="(item, index) in applicants" :key="index">
              <v-card-actions>
                <v-card-text>
                  <p>名稱：{{ item.user }}</p>
                  <p>自我介紹：{{ item.intro }}</p>
                </v-card-text>
              </v-card-actions>
              <v-card-actions>
                <v-btn class="pa-0" text @click="agree(item)">同意</v-btn>
                <v-btn class="pa-0" text @click="disagree(item)">不同意</v-btn>
              </v-card-actions>
            </div>
          </div>
          <div v-else>
            <v-card-text>沒有申請</v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import {
  getMembers,
  doApply,
  doAgree,
  doDisagree
} from "@/api/teams/teamAPI.js";
import { retriveDoc } from "@/api/retriveData/retrive.js";

export default {
  name: "teams",
  components: {},
  data() {
    return {
      id: 1,
      items: [],
      dialog: false,
      introduction: "",
      isCreator: true, //創建者, 同上
      applicants: [] //申請者，同上
    };
  },
  methods: {
    agree(value) {
      let user = JSON.parse(JSON.stringify(value));
      doAgree(this.getProject.id, user);
      this.updateProject();
    },
    disagree(value) {
      let user = JSON.parse(JSON.stringify(value));
      doDisagree(this.getProject.id, user);
      this.updateProject();
    },
    apply() {
      let vm = this;
      vm.dialog = false;
      doApply(vm.getProject.id, vm.getAuth, vm.introduction);
      vm.introduction = "";
      vm.updateProject();
    },
    handleData() {
      let vm = this;
      vm.pushItem("成員");
      vm.pushChildByName(0, vm.getProject.members);
      vm.pushItem("平台");
      vm.getProject.platform = vm.getProject.platform.split(",");
      vm.pushChild(1, vm.getProject.platform);
      vm.pushItem("標籤");
      vm.getProject.tags = vm.getProject.tags.split(",");
      vm.pushChild(2, vm.getProject.tags);
    },
    pushItem(name) {
      this.items.push({
        id: this.id,
        name: name,
        children: []
      });
      this.id++;
    },
    //Array of [{ name:"A" },{ name:"B"}, ......]
    pushChildByName(n, obj) {
      let vm = this;
      obj.forEach(element => {
        vm.items[n].children.push({ id: vm.id, name: element.name });
        vm.id++;
      });
    },
    //Array of ["A","B", ......]
    pushChild(n, obj) {
      let vm = this;
      obj.forEach(element => {
        vm.items[n].children.push({ id: vm.id, name: element });
        vm.id++;
      });
    },
    doReroute() {
      if (this.getProject == null) {
        this.$router.push("/teams");
      }
    },
    async getApplicants() {
      this.applicants = await getMembers(this.getProject.id);
    },
    updateProject() {
      retriveDoc("Projects", this.getProject.id);
    }
  },
  mounted() {
    this.$store.commit("setActivedPage", "/teams");
    this.doReroute();
    document.title = "Team | NGC";
    this.$vuetify.goTo("#Team");
    this.handleData();
    if (this.getLeader) this.getApplicants();
  },
  computed: {
    getAuth() {
      return this.$store.state.user;
    },
    getProject() {
      return this.$store.state.selectProject;
    },
    getLeader() {
      if (this.getAuth == null) return false;
      return this.getAuth[0].uid == this.getProject.members[0].uid;
    },
    getMember() {
      if (this.getAuth == null) return false;
      return JSON.parse(JSON.stringify(this.getAuth[1][0].parties)).includes(
        this.getProject.id
      );
    }
  }
};
</script>
