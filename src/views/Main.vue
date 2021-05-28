<template>
  <div class="top">
    <div class="container">
      <div class="top__body" v-for="headline in headlines" :key="headline.id">
        <h1>{{ headline.title }}</h1>
        <h2 v-for="(h, i) in headline.headers" :key="i + 1" :class="`h${i + 1}`">
          <span>{{ h }}</span>
        </h2>
        <div class="top__sub">
          <div>
            <ul>
              <li v-for="(li, l) in headline.phrasesLeft" :key="l">{{ li }}</li>
            </ul>
          </div>
          <div class="btn">
            <button class="orders light transition" @click="show = !show">{{ headline.btn }}</button>
          </div>
          <div>
            <ul>
              <li v-for="(ps, p) in headline.phrasesRight" :key="p">{{ ps }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- Фоновая картинка -->
    <div class="top__bg ibg" v-for="headline in headlines" :key="headline.id">
      <img :src="headline.imgUrl" :alt="headline.imgUrl" />
    </div>
    <transition name="fade">
      <Popap v-if="show" @close="show = false" />
    </transition>
  </div>
</template>
<script>
import Popap from "@/components/Popap";
import { db } from "@/main";
export default {
  components: {
    Popap
  },
  data: () => ({
    show: false,
    headlines: []
  }),
  mounted() {
    db.collection("headlines").onSnapshot(snapshot => {
      this.headlines = [];
      snapshot.forEach(doc => {
        this.headlines.push({
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
.btn {
  overflow: hidden;
  height: 80px;
  border-radius: 1rem;
  outline: none;
  button {
    font-size: 2rem;
    width: 100%;
    padding: 1rem 0;
    border-radius: 1rem;
    border-bottom: 5px solid #8c732e;
    background: linear-gradient(#8c732e, #eac251);
    &:hover,
    &:active,
    &:focus {
      margin-top: 5px;
    }
  }
}
.light {
  animation: light 2.5s linear infinite;
}

@keyframes light {
  0% {
    text-shadow: 0 0 0;
  }
  100% {
    text-shadow: 0 0 1rem #fff, 0 0 2rem #fff, 0 0 5rem #eac251;
  }
}
.transition {
  -webkit-transition: 0.15s ease-out 0.15s;
  -moz-transition: 0.15s ease-out 0.15s;
  -o-transition: 0.15s ease-out 0.15s;
  transition: 0.15s ease-out 0.15s;
}
.ibg {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  img {
    width: 100%;
    height: 100%;
  }
}
.top {
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex: 1 1 auto;
  position: relative;
  width: 100%;
  height: auto;
  color: #fff;
  overflow: hidden;
  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0.5;
    display: flex;
    justify-content: center;
  }
  &__body {
    text-align: center;
    padding: 2rem 0;
    position: relative;
    z-index: 1;
    h2 {
      &:first-of-type {
        text-align: left;
        margin-top: 2rem;
        margin-bottom: 0;
      }
      &:last-of-type {
        text-align: right;
      }
      span {
        border-bottom: 1px solid #eee;
      }
      &:nth-of-type(2),
      &:last-of-type {
        margin: 0;
      }
    }
    .h1,
    .h2,
    .h3 {
      display: block;
    }
    .h1,
    .h3 {
      animation: h1 2s linear;
    }
    .h2 {
      animation: h2 2s linear;
    }
    @keyframes h1 {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(0);
      }
    }
    @keyframes h2 {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(0);
      }
    }
    hr {
      border: 1px solid #777;
    }
  }
  &__sub {
    @include jcw($j, $c, $w);
    font-size: 1.5rem;
    margin-top: 2rem;
    div {
      flex: 0 0 33.33%;
      overflow: hidden;
    }
  }
}
@media (max-width: 992px) {
  .top__sub div {
    flex: 1 1 auto;
  }
  .top__sub ul {
    text-align: left;
  }
}
@media (max-width: 767px) {
  .ibg {
    img {
      width: auto;
    }
  }
  .top__body h2 {
    text-align: center !important;
  }
  .top__sub ul li p {
    font-size: 1rem;
  }
  .top__sub div {
    &:nth-of-type(2) {
      height: 50px;
      margin: 1rem 0;
    }
  }
}
</style>
