<template>
  <div>
    <footer class="footer">
      <div class="container">
        <div class="footer__body" v-for="f in footer" :key="f.id">
          <div class="footer__description">
            <div class="footer__logo">
              <router-link to="/">
                <img :src="f.logo" :alt="f.logo" />
              </router-link>
            </div>
            <div>
              <p>{{ f.description }}</p>
            </div>
          </div>
          <div class="footer__columns">
            <div class="footer__column">
              <h4>{{ f.header_left }}</h4>
              <div class="footer__cols">
                <ul>
                  <li v-for="(li1, i) in f.column_left" :key="i">{{ li1 }}</li>
                </ul>
                <ul>
                  <li v-for="(li2, j) in f.column_middle" :key="j">{{ li2 }}</li>
                </ul>
              </div>
            </div>
            <div class="footer__column">
              <h4>{{ f.header_right }}</h4>
              <div class="footer__cols">
                <ul>
                  <li v-for="(li3, k) in f.column_right1" :key="k">{{li3}}</li>
                </ul>
                <ul>
                  <li v-for="(li4, l) in f.column_right2" :key="l">{{li4}}</li>
                </ul>
              </div>
            </div>
          </div>
          <hr />
          <div class="footer__copy">
            <router-link to="/">{{f.copyright}}</router-link>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import { db } from "@/main";
export default {
  data: () => ({
    footer: []
  }),
  mounted() {
    db.collection("footer").onSnapshot(snapshot => {
      this.footer = [];
      snapshot.forEach(doc => {
        this.footer.push({
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
hr {
  border: 1px solid #111;
  margin-bottom: 1rem;
}
a {
  text-decoration: none;
  color: #fff !important;
  &:hover,
  &:focus {
    color: #eac251 !important;
    -webkit-transition: 0.1s ease-out 0.1s;
    -moz-transition: 0.1s ease-out 0.1s;
    -o-transition: 0.1s ease-out 0.1s;
    transition: 0.1s ease-out 0.1s;
  }
}
ul li {
  list-style-type: none;
}
.v-application p {
  margin-bottom: 0;
}
.container,
.v-application ul {
  padding: 0;
}
.footer {
  background: #010101;
  color: #fff;
  &__logo {
    width: 5rem;
    height: 5rem;
    img {
      width: auto;
      height: 100%;
    }
  }
  &__body {
    padding: 1rem;
  }
  &__description {
    display: flex;
    align-items: center;
    p {
      padding-left: 2rem;
    }
  }
  &__columns {
    @include jcw(space-between, flex-start, $w);
  }
  &__column {
    flex: 1 1 auto;
    margin: 1rem 2rem;
  }
  &__cols {
    display: flex;
    justify-content: space-between;
  }
  &__copy {
    text-align: center;
  }
}
@media (max-width: 767px) {
  .footer__logo {
    margin: 0 auto;
  }
  .footer__description {
    display: block;
    p {
      padding: 1rem 0 0 0;
    }
  }
  .footer__column {
    margin: 1rem 0;
  }
  .footer__cols {
    margin: 0 -1rem;
    ul {
      padding: 0 1rem;
    }
  }
}
</style>
