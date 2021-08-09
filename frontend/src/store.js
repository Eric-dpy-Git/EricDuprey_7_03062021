import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import "es6-promise/auto";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    day: 23,
    month: 10,
    year: 2021,
    products: "test",
  },
  getters: {
    formatedDate(state) {
      return `${state.day}/${state.month}/${state.year}`;
    },
    messagesGet(state) {
      return `${state.products}`;
    },
  },
  mutations: {
    INCREMENT_DAY(state) {
      state.day++, state.month--;
    },
    SET_MESSAGES(state) {
      state.year += 3;
    },
  },
  actions: {
    /* getTest({ commit }) {
      commit("SET_MESSAGES");
    }, */
    getTest({ commit }) {
      axios
        .get(
          `http://localhost:3000/api/messages/`
          /* `http://localhost:3000/api/messages/${this.submit.messageId}/dislike` */
        )
        .then((response) => {
          commit("SET_MESSAGES", response.data);
          console.log(response.data);
        });
    },
  },
});
