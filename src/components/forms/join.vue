<template>
  <v-card class="mx-auto pa-5" max-width="650" elevation="0">
    <v-form ref="form" id="form">
      <v-card max-width="600" elevation="0">
        <v-card-title class="headline">北科遊戲設計社｜報名</v-card-title>
        <v-container class="pa-5">
          <v-row>
            <v-col v-for="(item, index) in formData" :key="index">
              <v-text-field
                class="primary--text"
                color="white"
                :rules="item.rule"
                :label="item.perform"
                :value="item.value"
                :name="item.entry"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span>是否為北科學生?</span>
              <v-radio-group v-model="radios" name="entry.353177557" row>
                <v-radio
                  label="是"
                  color="red"
                  name="entry.353177557"
                  value="是"
                ></v-radio>
                <v-radio
                  label="其他"
                  color="red"
                  name="entry.353177557"
                  type="radio"
                  value="__other_option__"
                ></v-radio>
                <v-text-field
                  v-model="unit"
                  label="學校／單位"
                  :rules="unitRule"
                  name="entry.353177557.other_option_response"
                  id="entry.353177557.other_option_response"
                  value="其他："
                ></v-text-field>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row style="position:relative;margin-top:20px">
            <v-col>
              <v-btn color="btnColor" class="mr-4" @click="send" elevation="0">
                <span class="white--text">
                  提交
                </span>
              </v-btn>
            </v-col>
            <v-col cols="6"></v-col>
            <v-col cols="2">
              <p class="red--text">{{ submitState }}</p>
            </v-col>
          </v-row>
          <p>{{ unit }}</p>
        </v-container>
      </v-card>
    </v-form>
  </v-card>
</template>

<script>
import { postForm } from "@/api/forms/postForm.js";

export default {
  data() {
    return {
      radios: "radio-1",
      submitState: "",
      formData: [
        {
          perform: "姓名",
          entry: "entry.1492883158",
          value: "Aaron",
          rule: [
            v => !!v || "Name is required",
            v => v.length <= 30 || "Name must be less than 10 characters"
          ]
        },
        {
          perform: "就讀系級",
          entry: "entry.241297651",
          value: "CSIE",
          rule: [
            v => !!v || "Major is required",
            v => v.length <= 30 || "Name must be less than 10 characters"
          ]
        },
        {
          perform: "信箱",
          entry: "entry.1829177282",
          value: "t107590017@ntut.org.tw",
          rule: [
            v => !!v || "E-mail is required",
            v => /.+@.+/.test(v) || "E-mail must be valid"
          ]
        }
      ],
      unitRule: [
        v => !!v || "Unit is required",
        v => v.length <= 30 || "Name must be less than 10 characters"
      ],
      unit: "NTUT"
    };
  },
  methods: {
    send() {
      let url =
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdOLRJueoyF9UIp3tDoPJBKkOVhqkdEWi98HUkASpkQJ9C27g/formResponse";
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
