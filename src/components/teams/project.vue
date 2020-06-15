<template>
  <div v-if="getProject">
    <v-row>
      <v-col cols="0" sm="3" md="3" lg="3" xl="3"></v-col>
      <v-col cols="11" sm="6" md="6" lg="6" xl="6">
        <v-card elevation="0">
          <v-card-title>
            <p>專案名稱：{{ getProject.name }}</p>
          </v-card-title>
          <v-card-subtitle>
            <p>專案介紹：{{ getProject.intro }}</p>
            <p>招募中：{{ getProject.recruiting }}</p>
            <v-dialog v-model="dialog" width="500" v-if="isRecruiting">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="btnColor"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  text
                  elevation="0"
                >
                  申請加入
                </v-btn>
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
          </v-card-subtitle>
          <v-card-actions>
            <v-treeview :items="items"></v-treeview>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="isMember">
      <hr />
      <v-row>
        <v-col cols="0" sm="3" md="3" lg="3" xl="3"></v-col>
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
    </div>
    <div>
      <div v-if="isMember">
        <hr />
        <v-row>
          <v-col cols="0" sm="3" md="3" lg="3" xl="3"></v-col>
          <v-col cols="11" sm="6" md="6" lg="6" xl="6">
            <v-card elevation="0">
              <v-card-title>
                <p>申請名單</p>
              </v-card-title>
              <v-card-actions v-for="(item, index) in applicants" :key="index">
                <v-card-text>
                  <p>{{ item.name }}</p>
                </v-card-text>
                <v-card-text>
                  <v-btn class="pa-0" text @click="agree(item)">同意</v-btn>
                  <v-btn class="pa-0" text @click="disagree(item)"
                    >不同意</v-btn
                  >
                </v-card-text>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "teams",
  components: {},
  data() {
    return {
      id: 1,
      items: [],
      dialog: false,
      introduction: "",
      isMember: true, //判斷有沒有權限，要從js抓
      isRecruiting: true, //招募中, 同上
      isCreator: true, //創建者, 同上
      applicants: [{ name: "a student" }, { name: "b student" }] //申請者，同上
    };
  },
  methods: {
    agree(value) {
      console.log(value);
    },
    disagree(value) {
      console.log(value);
    },
    apply() {
      this.dialog = false;
    },
    handleData() {
      let vm = this;
      vm.pushItem("成員");
      vm.pushChildByName(0, vm.getProject.parties);
      vm.pushItem("平台");
      vm.pushChild(1, vm.getProject.platform);
      vm.pushItem("標籤");
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
    }
  },
  mounted() {
    this.$store.commit("setActivedPage", "/teams");
    document.title = "Team | NGC";
    this.handleData();
  },
  computed: {
    getProject() {
      return this.$store.state.selectProject;
    }
  }
};
</script>
