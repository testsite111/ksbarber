import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "./assets/style.scss";
import VuetifyConfirm from "vuetify-confirm";
import firebase from "firebase";

Vue.config.productionTip = false;

Vue.use(VuetifyConfirm, {
  vuetify,
  buttonTrueText: "Да",
  buttonFalseText: "Нет",
  width: 500,
});

const firebaseConfig = {
  apiKey: "AIzaSyBsM-ZmRTHeaen_JzQY-9lNROSq_VFL9e8",
  authDomain: "ksbarber-7a7c2.firebaseapp.com",
  projectId: "ksbarber-7a7c2",
  storageBucket: "ksbarber-7a7c2.appspot.com",
  messagingSenderId: "840965263002",
  appId: "1:840965263002:web:135eac6c86d32b9ec5d923",
  measurementId: "G-EE9WT00LGM",
};

require("firebase/firestore");
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
  created() {
    let vm = this;
    firebase.auth().onAuthStateChanged(function(user) {
      vm.$store.dispatch("STATE_CHANGED", user);
    });
  },
}).$mount("#app");
