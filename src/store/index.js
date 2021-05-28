import Vue from "vue";
import Vuex from "vuex";
//import doubleGis from "./double_gis";
import generalModule from "./general";
import userModule from "./user";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    //doubleGis,
    generalModule,
    userModule,
  },
  methods: {
    signup() {
      this.$store.dispatch("SIGNUP", {
        email: this.email,
        password: this.password,
      });
    },
    signin() {
      this.$store.dispatch("SIGNIN", {
        email: this.email,
        password: this.password,
      });
    },
  },
});
export default store;
