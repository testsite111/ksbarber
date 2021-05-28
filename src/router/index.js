import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Graduates from "../views/Graduates.vue";
import Teachers from "../views/Teachers.vue";
import Training from "../views/Training.vue";
import Reviews from "../views/Reviews.vue";
import Сontacts from "../views/Сontacts.vue";
import Login from "../admin/Login.vue";
import Logout from "../admin/Logout.vue";
import Signup from "../admin/Signup.vue";
import Pages from "../admin/Pages.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/graduates",
    name: "Graduates",
    component: Graduates,
  },
  {
    path: "/teachers",
    name: "Teachers",
    component: Teachers,
  },
  {
    path: "/training",
    name: "Training",
    component: Training,
  },
  {
    path: "/reviews",
    name: "Reviews",
    component: Reviews,
  },
  {
    path: "/contacts",
    name: "Сontacts",
    component: Сontacts,
  },
  {
    path: "/admin",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/pages",
    name: "Pages",
    component: Pages,
    beforeEnter: AuthGuard,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

function AuthGuard(from, to, next) {
  if (store.getters.isUserAuthenticated) {
    next();
  } else {
    next("/admin");
  }
}

export default router;
