import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentValue: 0,
  },
  mutations: {
    INCREMENT_COUNTER(state) {
      state.currentValue += 1;
    },
    DECREMENT_COUNTER(state) {
      state.currentValue -= 1;
    },
  },
  actions: {
    increment({ commit }) {
      commit("INCREMENT_COUNTER");
    },
    decrement({ commit }) {
      commit("DECREMENT_COUNTER");
    },
  },
});
