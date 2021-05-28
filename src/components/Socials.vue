<template>
  <div class="socials">
    <div v-for="social in socials" :key="social.id" class="social">
      <a :href="social.link">
        <img :src="social.img" :alt="social.img" :title="social.name" />
      </a>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
export default {
  data: () => ({
    socials: []
  }),
  mounted() {
    db.collection("socials").onSnapshot(snapshot => {
      this.socials = [];
      snapshot.forEach(doc => {
        this.socials.push({
          id: doc.id,
          ...doc.data()
        });
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.social {
  width: 4rem;
  height: 4rem;
}
.social img {
  width: 100%;
  height: 100%;
}
.social img:hover,
.social img:focus {
  border-radius: 50%;
  -webkit-transition: 0.15s ease-out 0.15s;
  -o-transition: 0.15s ease-out 0.15s;
  transition: 0.15s ease-out 0.15s;
}
.social img[title="Instagram"]:hover {
  box-shadow: 0 0 10px 5px #a11cc7;
}
.social img[title="VKontakte"]:hover {
  box-shadow: 0 0 10px 5px #4d76a1;
}
.social img[title="WhatsApp"]:hover {
  box-shadow: 0 0 10px 5px #57bb63;
}
</style>