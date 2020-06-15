<template>
  <div v-if="getProject">
    <v-row>
      <v-col cols="3"></v-col>
      <v-col cols="6">
        <v-card elevation="0">
          <v-card-title>
            <p>專案名稱：{{ getProject.name }}</p>
          </v-card-title>
          <v-card-subtitle>
            <p>專案介紹：{{ getProject.intro }}</p>
          </v-card-subtitle>
          <v-card-actions>
            <v-treeview :items="items"></v-treeview>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "teams",
  components: {},
  data() {
    return {
      id: 1,
      items: []
    };
  },
  methods: {
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
