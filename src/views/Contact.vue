<template>
  <div class="contact">
    <contactForm />
  </div>
</template>

<script>
import contactForm from "@/components/forms/contact.vue";
export default {
  name: "Contact",
  components: { contactForm },
  methods: {},
  mounted() {
    this.$store.commit("setActivedPage", "/contact");
    document.title = "Contact | NGC";
  }
};
</script>
