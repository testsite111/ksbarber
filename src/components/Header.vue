<template>
  <div>
    <header class="header" v-for="h in header" :key="h.id">
      <div class="header__body container">
        <div class="header__logo">
          <router-link to="/">
            <img :src="h.logo" :alt="h.logo" title="На главную страницу" />
          </router-link>
        </div>
        <div class="header__menu">
          <ul>
            <li v-for="(item, i) in menuItems" text :key="item.id" :data="i + 1">
              <router-link :to="item.route">{{ item.title }}</router-link>
            </li>
          </ul>
          <v-btn @click.prevent="logout" v-if="isUserAuthenticated">Выйти</v-btn>
        </div>
        <button type="button" class="btn-burger" @click="(show = !show), (isActive = !isActive)">
          <span v-for="i in 3" :key="i" :class="{ active: isActive }"></span>
        </button>
        <button @click="show2 = !show2" class="backcall">
          <img :src="h.backcall" :alt="h.backcall" title="Заказать обратный звонок" />
        </button>
      </div>
      <transition name="fade">
        <div class="mobile" v-if="show">
          <div v-for="(item, i) in menuItems" text :key="item.id" :data="i + 1">
            <router-link :to="item.route">{{ item.title }}</router-link>
          </div>
        </div>
      </transition>
    </header>
    <transition name="fade">
      <PopapBackCall v-if="show2" @close="show2 = false" />
    </transition>
  </div>
</template>

<script>
import PopapBackCall from "@/components/PopapBackCall";
import { db } from "@/main";
export default {
  data: () => ({
    show: false,
    show2: false,
    isActive: false,
    header: []
  }),
  components: {
    PopapBackCall
  },
  computed: {
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated;
    },
    menuItems() {
      return this.isUserAuthenticated
        ? [
            {
              title: "Страницы",
              route: "/pages"
            }
          ]
        : [
            {
              title: "Выпускники",
              route: "/graduates"
            },
            {
              title: "Преподаватели",
              route: "/teachers"
            },
            {
              title: "Обучение",
              route: "/training"
            },
            {
              title: "Отзывы",
              route: "/reviews"
            },
            {
              title: "Контакты",
              route: "/contacts"
            }
          ];
    }
  },
  methods: {
    logout() {
      this.$confirm("Вы действительно хотите выйти из админ. панели?").then(
        res => {
          if (res) this.$store.dispatch("SIGNOUT");
        }
      );
    }
  },
  mounted() {
    db.collection("header").onSnapshot(snapshot => {
      this.header = [];
      snapshot.forEach(doc => {
        this.header.push({
          id: doc.id,
          ...doc.data()
        });
      });
    });
  }
};
</script>
<style lang="scss" scoped>
.backcall {
  width: 2.5rem;
  height: auto;
  img {
    width: 100%;
    height: 100%;
    &:hover {
      -webkit-animation: vibrate 2s cubic-bezier(0.36, 0.07, 0.19, 0.97)
        infinite;
      animation: vibrate 2s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      -webkit-perspective: 300px;
      perspective: 300px;
    }
  }
}
@keyframes vibrate {
  0.50%,
  10%,
  20%,
  30%,
  40%,
  50% {
    -webkit-transform: rotate(5deg);
    transform: rotate(5deg);
  }
  5%,
  15%,
  25%,
  35%,
  45% {
    -webkit-transform: rotate(-5deg);
    transform: rotate(-5deg);
  }
  100% {
    -webkit-transform: rotate(5deg);
    transform: rotate(5deg);
  }
}
a {
  text-decoration: none;
}
$j: center;
$c: center;
$w: wrap;
@mixin jcw($j, $c, $w) {
  display: flex;
  justify-content: $j;
  align-items: $c;
  flex-wrap: $w;
}
.btn-burger {
  @include jcw($j, $c, nowrap);
  display: none;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  cursor: pointer;
  background: none;
  span {
    position: absolute;
    background: #fff;
    width: 35px;
    height: 2px;
    -webkit-transition: 0.1s ease-out 0.1s;
    -moz-transition: 0.1s ease-out 0.1s;
    -o-transition: 0.1s ease-out 0.1s;
    transition: 0.1s ease-out 0.1s;
    &:first-child {
      margin-top: -10px;
    }
    &:last-child {
      margin-top: 10px;
    }
  }
  .active {
    &:first-child,
    &:last-child {
      margin: 0;
    }
    &:first-child {
      -moz-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    &:last-child {
      -moz-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
      -o-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }
    &:nth-child(2) {
      width: 0;
    }
  }
}
.mobile {
  position: absolute;
  width: 100%;
  height: auto;
  left: 0;
  top: 5rem;
  background: rgba(0, 0, 0, 0.75);
  z-index: 2;
  padding: 0.5rem 2rem;
  text-align: center;
  div {
    margin: 1rem 0;
  }
  a {
    color: #fff;
    text-transform: uppercase;
    font-size: 2rem;
  }
}
.header {
  background: #010101;
  &__body {
    display: flex;
    padding: 0 1rem;
  }
  &__logo {
    width: 5rem;
    height: 5rem;
    img {
      width: 100%;
      height: 100%;
      &:hover {
        animation: circles 0.5s linear;
      }
    }
    @keyframes circles {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
  &__menu {
    @include jcw($j, $c, $w);
    margin: 0 auto;
    ul {
      display: flex;
      li {
        padding: 0 2rem;
        a {
          color: #fff;
          text-transform: uppercase;
          &:hover,
          &:active,
          &:focus {
            color: #eac251;
            -webkit-transition: 0.15s ease-out 0.15s;
            -moz-transition: 0.15s ease-out 0.15s;
            -o-transition: 0.15s ease-out 0.15s;
            transition: 0.15s ease-out 0.15s;
          }
        }
      }
    }
  }
}
@media (max-width: 992px) {
  .header__menu ul li {
    padding: 0 0.5rem;
  }
}
@media (max-width: 767px) {
  .btn-burger {
    display: flex;
  }
  .header__menu {
    display: none;
  }
  .header__body {
    justify-content: space-between;
    align-items: center;
  }
}
</style>
