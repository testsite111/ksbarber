<template>
  <div>
    <ul class="slider-ul" v-for="ps in photos" :key="ps.id">
      <li v-for="(p, i) in ps.photo" :key="i">
        <a :href="photo_data.photo[i]">
          <img :src="photo_data.photo[i]" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from "@/main";
export default {
  data: () => ({
    photos: []
  }),
  props: {
    photo_data: {
      type: Object,
      default: () => []
    }
  },
  mounted() {
    db.collection("photos").onSnapshot(snapshot => {
      this.photos = [];
      snapshot.forEach(doc => {
        this.photos.push({
          id: doc.id,
          ...doc.data()
        });
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.slider-ul {
  background: #eee;
  position: relative;
  display: flex;
  width: 100%;
  transition: all ease 1s;
  left: 0;
  padding: 0;
  list-style-type: none;
}
.slider-ul li {
  display: flex;
  align-items: center;
  background: #eee;
  position: relative;
  height: 15rem;
  flex: 0 0 15.1rem;
}
.slider-ul li a img {
  width: 100%;
  height: 100%;
}
</style>