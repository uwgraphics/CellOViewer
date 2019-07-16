import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  optionSelected: "default",
  search: ""
};

const mutations = {
  CHANGE_SEARCH(state, payload) {
    state.search = payload;
  },
  CHANGE_OPTION(state, payload) {
    state.optionSelected = payload;
  },
};

const actions = {
  changeSearch(context, searchContent) {
    context.commit("CHANGE_SEARCH", searchContent);
  },
  changeOption(context, option) {
    context.commit("CHANGE_OPTION", option);
  },
};

const getters = {
  getSearch(state) {
    return state.search;
  },
  getOption(state) {
    return state.optionSelected;
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
