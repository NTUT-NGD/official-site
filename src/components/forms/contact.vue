<template>
  <v-form ref="form" id="form">
    <v-card class="mx-auto pa-5" max-width="600" elevation="0">
      <v-card elevation="0" outlined>
        <v-card-title class="headline">聯絡我們</v-card-title>
        <v-card-subtitle
          >有什麼想詢問我們的問題呢、或是只是想跟我們聊天，都可以透過下方的表單聯絡我們</v-card-subtitle
        >
      </v-card>
      <v-card
        class="mx-auto pa-5"
        outlined
        elevation="0"
        style="position:relative;margin-top:20px"
        v-for="(item, index) in formData"
        :key="index"
      >
        <v-text-field
          class="primary--text"
          color="white"
          :rules="item.rule"
          :label="item.perform"
          :value="item.value"
          :name="item.entry"
          required
        ></v-text-field>
      </v-card>
      <v-card
        class="mx-auto pa-5"
        outlined
        elevation="0"
        style="position:relative;margin-top:20px"
      >
        <v-textarea
          :rules="message.rule"
          :label="message.perform"
          :value="message.value"
          :name="message.entry"
        >
        </v-textarea>
      </v-card>
      <v-row style="position:relative;margin-top:20px">
        <v-col>
          <v-btn color="secondary" class="mr-4" @click="send" elevation="0">
            提交
          </v-btn>
        </v-col>
        <v-col cols="6"></v-col>
        <v-col cols="2">
          <p class="red--text">{{ submitState }}</p>
        </v-col>
      </v-row>
    </v-card>
  </v-form>
</template>

<script>
import { postForm } from "@/api/forms/postForm.js";

export default {
  data() {
    return {
      submitState: "",
      formData: [
        {
          perform: "姓名",
          entry: "entry.597223030",
          value: "",
          rule: [
            v => !!v || "Name is required",
            v => v.length <= 30 || "Name must be less than 10 characters"
          ]
        },
        {
          perform: "信箱",
          entry: "entry.1274605172",
          value: "",
          rule: [
            v => !!v || "E-mail is required",
            v => /.+@.+/.test(v) || "E-mail must be valid"
          ]
        }
      ],
      message: {
        perform: "您的訊息",
        entry: "entry.1927840133",
        value: "",
        rule: [
          v => !!v || "Message is required",
          v => v.length <= 300 || "Name must be less than 300 characters"
        ]
      }
    };
  },
  methods: {
    send() {
      let url =
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfQ30GpXUP0PaLdu-KDquuLB_NNcJeVa8siFMybIwAnfvcs7g/formResponse";
      let vm = this;
      vm.setSubmitState();
      vm.$refs.form.reset();
      let form = document.getElementById("form");
      let formdata = new FormData(form);
      postForm(url, formdata);
    },
    setSubmitState() {
      let vm = this;
      vm.submitState = "提交成功";
      setTimeout(() => {
        vm.submitState = "";
      }, 1500);
    }
  }
};
</script>
