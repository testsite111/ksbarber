<template>
  <div>
    <Slider />
    <div class="main" v-for="tr in training" :key="tr.id">
      <h2>{{tr.title}}</h2>
      <div class="main__body container">
        <div class="main__text">
          <h3>{{tr.header1}}</h3>
          <ul>
            <li v-for="(li, l) in tr.advantages" :key="l">{{li}}</li>
          </ul>
          <p>{{tr.phrase}}</p>
          <div class="btn">
            <button class="orders transition" @click="show = !show">{{tr.btn}}</button>
          </div>
        </div>
        <div class="main__slider">
          <h3>{{tr.header2}}</h3>
          <Works />
        </div>
      </div>
      <BtnPays />
      <h2>{{tr.header3}}</h2>
      <div class="main__youtube container">
        <Video />
      </div>
    </div>
    <transition name="fade">
      <Popap v-if="show" @close="show = false" />
    </transition>
  </div>
</template>
<script>
import Slider from "@/components/Slider";
import Works from "@/components/Works";
import Video from "@/components/Video";
import Popap from "@/components/Popap";
import BtnPays from "@/components/BtnPays";
import { db } from "@/main";
export default {
  components: {
    Slider,
    Works,
    Video,
    Popap,
    BtnPays
  },
  data: () => ({
    show: false,
    training: []
  }),
  mounted() {
    db.collection("training").onSnapshot(snapshot => {
      this.training = [];
      snapshot.forEach(doc => {
        this.training.push({
          id: doc.id,
          ...doc.data()
        });
      });
    });
  }
};
</script>
<style lang="scss" scoped>
$j: center;
$c: center;
$w: wrap;

@mixin jcw($j, $c, $w) {
  display: flex;
  justify-content: $j;
  align-items: $c;
  flex-wrap: $w;
}

.main {
  &__body {
    @include jcw(space-evenly, flex-start, $w);
    h3 {
      margin-bottom: 1rem;
    }
    div {
      flex: 0 0 auto;
    }
  }
  &__text {
    ul {
      li {
        font-size: 18px;
        line-height: 2;
        &::before {
          content: url("~@/assets/img/icons/ok.png");
          margin-right: 0.5rem;
        }
      }
    }
    p {
      padding: 1rem 0 2rem 0;
    }
  }
  &__youtube {
    text-align: center;
    margin-bottom: 2rem !important;
  }
  &__slider {
    h3 {
      text-align: center;
    }
  }
}

@media (max-width: 1440px) {
  .main__slider h3 {
    margin-top: 2rem;
  }
}
@media (max-width: 767px) {
  .main__body div {
    flex: 1 1 auto;
  }
  .main__youtube {
    text-align: center;
  }
}
</style>