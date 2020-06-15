<template>
  <v-container>
    <v-data-table
      :footer-props="{
        'items-per-page-options': [15]
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
  </v-container>
</template>

<script>
export default {
  name: "teams",
  components: {},
  data() {
    return {
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
          parties: [{ name: "PlayerA" }, { name: "PlayerB" }]
        }
      ]
    };
  },
  methods: {
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
  computed: {}
};
</script>

<style>
td {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
