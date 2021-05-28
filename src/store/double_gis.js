import axios from "axios";
export default {
  state: {
    reviews: [],
  },
  mutations: {
    SET_REVIEWS_TO_STATE: (state, reviews) => {
      state.reviews = reviews;
    },
  },
  actions: {
    GET_REVIEWS_FROM_API({ commit }) {
      return axios("http://localhost:3000/reviews", {
        //json-server --watch db.json
        method: "GET",
      })
        .then((reviews) => {
          commit("SET_REVIEWS_TO_STATE", reviews);
          return reviews;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
  },
  getters: {
    REVIEWS(state) {
      return state.reviews;
    },
  },
};
