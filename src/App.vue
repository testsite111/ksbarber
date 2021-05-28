<template>
  <v-app>
    <div class="wrapper">
      <Header />
      <v-main>
        <router-view />
      </v-main>
      <Footer />
    </div>
  </v-app>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>