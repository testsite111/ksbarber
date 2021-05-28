<template>
  <div id="slider">
    <button id="leftSlide" title="Previous" @click="prevSlide">
      <span></span>
      <span></span>
    </button>
    <div class="slider" v-for="work in works" :key="work.id">
      <ul id="pics" :style="{'margin-left':'-'+(500*currentSlideIndex) + 'px'}">
        <li v-for="(w, i) in work.photos" :key="i">
          <a :href="w">
            <img :src="w" :alt="w" />
          </a>
          <p>{{i % 2 === 0 ? work.after : work.before}}</p>
        </li>
      </ul>
    </div>
    <button id="rightSlide" title="Next" @click="nextSlide">
      <span></span>
      <span></span>
    </button>
  </div>
</template>
<script>
import { db } from "@/main";
export default {
  data: () => ({
    works: [],
    currentSlideIndex: 0,
    countPhotos: 7
  }),
  methods: {
    prevSlide() {
      if (this.currentSlideIndex > 0) {
        this.currentSlideIndex--;
      }
    },
    nextSlide() {
      if (this.currentSlideIndex >= this.countPhotos) {
        this.currentSlideIndex = 0;
      } else {
        this.currentSlideIndex++;
      }
    },
    interval() {
      this.interval = setInterval(
        function() {
          this.nextSlide();
        }.bind(this),
        3500
      );
    }
  },
  mounted() {
    this.interval();
    db.collection("works").onSnapshot(snapshot => {
      this.works = [];
      snapshot.forEach(doc => {
        this.works.push({
          id: doc.id,
          ...doc.data()
        });
      });
    });
  }
};
</script>
<style lang="scss" scoped>
#pics li a img {
  transition: all ease 3s;
}
#slider {
  overflow: hidden;
  display: flex;
  align-items: center;
}
.slider {
  position: relative;
  overflow: hidden;
  z-index: 0;
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
}
#leftSlide,
#rightSlide {
  outline: none;
  background: none;
  border-radius: 50%;
  position: relative;
  width: 5rem;
  height: 5rem;
}
#rightSlide span {
  left: 1.5rem;
}
#leftSlide span {
  right: 1.5rem;
}
#rightSlide span,
#leftSlide span {
  background: #010101;
  width: 2rem;
  height: 3px;
  position: absolute;
}
#rightSlide:hover span,
#rightSlide:focus span,
#leftSlide:hover span,
#leftSlide:focus span {
  background: #777;
}
#rightSlide span:first-of-type,
#leftSlide span:first-of-type {
  transform: rotate(45deg);
}
#rightSlide span:last-of-type,
#leftSlide span:last-of-type {
  transform: rotate(-45deg);
}
#rightSlide span:first-of-type,
#leftSlide span:last-of-type {
  margin-top: -10px;
}
#rightSlide span:last-of-type,
#leftSlide span:first-of-type {
  margin-top: 11px;
}
#pics {
  position: relative;
  display: flex;
  width: 100%;
  transition: all ease 1s;
  left: 0;
  padding: 0;
  list-style-type: none;
}
#pics li {
  display: flex;
  align-items: center;
  background: #eee;
  width: 500px;
  height: 330px;
  position: relative;
}
#pics li p {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1rem;
  display: flex;
  justify-content: center;
  font-size: 2rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
}
</style>