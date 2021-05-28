<template>
  <div>
    <div v-for="map in maps" :key="map.id">
      <iframe
        :src="map.src"
        :width="map.width"
        :height="map.height"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>
<script>
import { db } from "@/main";
export default {
  data: () => ({
    maps: [],
  }),
  mounted() {
    db.collection("maps").onSnapshot((snapshot) => {
      this.maps = [];
      snapshot.forEach((doc) => {
        this.maps.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    });
  },
};
</script>
<style lang="scss" scoped>
.contacts__maps iframe {
  position: relative;
  width: 100%;
  height: 600px;
}
</style>
