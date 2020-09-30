<template>
  <v-app id="Team" class="pa-0">
    <v-row justify="center">
      <v-col cols="11" sm="6" md="6" lg="6" xl="6">
        <v-card elevation="0">
          <v-card-title>
            <p>專案名稱：{{ getProject.name }}</p>
          </v-card-title>
          <v-card-subtitle>
            <p>專案介紹：{{ getProject.intro }}</p>
            <p>創建專案：{{ getProject.members[0].name }}</p>
            <p v-if="checkMember == false">
              招募狀態：
              <span v-if="checkApplicant">申請中</span>
              <v-dialog
                v-model="dialog"
                width="500"
                v-else-if="getProject.recruiting === '是'"
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
            <v-treeview :items="getItems"></v-treeview>
          </v-card-actions>
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
        </v-card>
        <v-card elevation="0" v-if="checkLeader">
          <v-card-title>
            <p>申請名單</p>
          </v-card-title>
          <div v-if="getProject.applicants.length > 0">
            <div v-for="(item, index) in getProject.applicants" :key="index">
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
import { doApply, doAgree, doDisagree } from "@/api/teams/teamAPI.js";
import { retriveDoc } from "@/api/retriveData/retrive.js";

export default {
  name: "teams",
  components: {},
  data() {
    return {
      duration: 5,
      recordDate: new Date(),
      project: null,
      dialog: false,
      introduction: ""
    };
  },
  methods: {
    agree(value) {
      let user = JSON.parse(JSON.stringify(value));
      doAgree(this.getProject.id, user);
    },
    disagree(value) {
      let user = JSON.parse(JSON.stringify(value));
      doDisagree(this.getProject.id, user);
    },
    apply() {
      let vm = this;
      vm.dialog = false;
      doApply(vm.getProject.id, vm.getAuth, vm.introduction);
      vm.introduction = "";
    },
    doReroute() {
      if (this.getProject == null) {
        this.$router.push("/teams");
      }
    },
    async setProject() {
      let vm = this;
      retriveDoc("Projects", vm.$store.state.selectProject.id);
    }
  },
  mounted() {
    this.doReroute();
    this.$store.commit("setActivedPage", "/teams");
    document.title = "Team | NGC";
    this.$vuetify.goTo("#Team");
    this.setProject();
  },
  computed: {
    getItems() {
      let vm = this;
      let items = [];
      let id = 0;
      items.push({ id: id, name: "成員", children: [] });
      id++;
      vm.getProject.members.forEach(element => {
        items[0].children.push({
          id: id,
          name: element.name + " - " + element.job.toUpperCase()
        });
        id++;
      });
      items.push({
        id: id,
        name: "標籤",
        children: [{ id: id + 1, name: vm.getProject.tags }]
      });
      id++;
      items.push({
        id: id,
        name: "平台",
        children: [{ id: id + 1, name: vm.getProject.platform }]
      });
      return items;
    },
    getAuth() {
      return this.$store.state.user;
    },
    getProject() {
      return this.$store.state.selectProject;
    },
    checkLeader() {
      let state = this.getProject;
      return state.members[0].uid == this.getAuth[0].uid;
    },
    checkMember() {
      let isMember = false;
      this.getProject.members.forEach(element => {
        if (element.uid == this.getAuth[0].uid) {
          isMember = true;
          return true;
        }
      });
      return isMember;
    },
    checkApplicant() {
      let isApplicant = false;
      this.getProject.applicants.forEach(element => {
        if (element.uid == this.getAuth[0].uid) {
          isApplicant = true;
          return true;
        }
      });
      return isApplicant;
    }
  },
  wathc: {
    // getProject: {
    //   handler: function() {},
    //   deep: true
    // }
  }
};
</script>
