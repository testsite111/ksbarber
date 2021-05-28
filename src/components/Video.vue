<template>
  <div>
    <iframe
      v-for="y in youtube"
      :key="y.id"
      :src="y.link"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>
<script>
import { db } from "@/main";
export default {
  data: () => ({
    youtube: []
  }),
  mounted() {
    db.collection("youtube").onSnapshot(snapshot => {
      this.youtube = [];
      snapshot.forEach(doc => {
        this.youtube.push({
          id: doc.id,
          ...doc.data()
        });
      });
    });
  }
};
</script>
<style lang="scss" scoped>
iframe {
  width: 50%;
  height: 320px;
}
@media (max-width: 767px) {
  iframe {
    width: 100%;
  }
}
</style>