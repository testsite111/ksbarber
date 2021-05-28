<template>
  <div class="photos">
    <div v-for="ts in title_slider" :key="ts.id">
      <h2>{{ts.title}}</h2>
      <div id="slider-photos">
        <button class="left-btn" title="Previous" @click="prevSlide">
          <span></span>
          <span></span>
        </button>
        <div class="slider-inner">
          <Photos
            :slide_data="photos"
            :style="{'margin-left':'-'+(100/count*currentSlideIndex) + '%'}"
            class="photos-slide slides"
          />
          <Photos
            :slide_data="photos"
            :style="{'margin-left':'-'+(100*currentSlideIndex) + '%'}"
            class="photos-slide mobile-slides"
          />
        </div>
        <button class="right-btn" title="Next" @click="nextSlide">
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "@/main";
import Photos from "@/components/Photos";
export default {
  data: () => ({
    title_slider: [],
    photos: [],
    currentSlideIndex: 0,
    countPhotos: 15,
    count: 5
  }),
  components: {
    Photos
  },
  computed: {
    basedOnWindowWidth() {
      if (this.windowWidth > 768) {
        return true;
      }
      return false;
    }
  },
  methods: {
    prevSlide() {
      if (this.currentSlideIndex > 0) {
        this.currentSlideIndex--;
      }
    },
    nextSlide() {
      if (this.currentSlideIndex >= this.countPhotos - this.count) {
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
        2500
      );
    }
  },
  mounted() {
    this.interval();
    db.collection("title_slider").onSnapshot(snapshot => {
      this.title_slider = [];
      snapshot.forEach(doc => {
        this.title_slider.push({
          id: doc.id,
          ...doc.data()
        });
      });
    });
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
.photos-slide {
  transition: all ease 1s;
}
#slider-photos {
  overflow: hidden;
  display: flex;
  align-items: center;
}
.slider-inner {
  position: relative;
  overflow: hidden;
  z-index: 0;
  margin: 0 auto;
  width: 100%;
}
.left-btn,
.right-btn {
  outline: none;
  background: none;
  border-radius: 50%;
  position: relative;
  width: 5rem;
  height: 5rem;
}
.right-btn span {
  left: 1.5rem;
}
.left-btn span {
  right: 1.5rem;
}
.right-btn span,
.left-btn span {
  background: #010101;
  width: 2rem;
  height: 3px;
  position: absolute;
}
.right-btn:hover span,
.right-btn:focus span,
.left-btn:hover span,
.left-btn:focus span {
  background: #777;
}
.right-btn span:first-of-type,
.left-btn span:first-of-type {
  transform: rotate(45deg);
}
.right-btn span:last-of-type,
.left-btn span:last-of-type {
  transform: rotate(-45deg);
}
.right-btn span:first-of-type,
.left-btn span:last-of-type {
  margin-top: -10px;
}
.right-btn span:last-of-type,
.left-btn span:first-of-type {
  margin-top: 11px;
}
.mobile-slides {
  display: none;
}
@media (max-width: 767px) {
  .slides {
    display: none;
  }
  .mobile-slides {
    display: block;
  }
  .slider-ul li {
    height: 20rem;
    flex: 0 0 15rem;
  }
}
</style>
