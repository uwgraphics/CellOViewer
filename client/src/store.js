import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  cardHeight: "600px",
  detailObject: {},
  geneSelected: "",
  optionSelected: "default",
  search: ""
};

const mutations = {
  CHANGE_CARD_HEIGHT(state, payload) {
    state.cardHeight = payload;
  },
  CHANGE_DETAIL_OBJECT(state, payload) {
    state.detailObject = payload;
  },
  CHANGE_GENE_SELECTED(state, payload) {
    state.geneSelected = payload;
  },
  CHANGE_SEARCH(state, payload) {
    state.search = payload;
  },
  CHANGE_OPTION(state, payload) {
    state.optionSelected = payload;
  }
};

const actions = {
  changeCardHeight(context, cardHeightContent) {
    context.commit("CHANGE_CARD_HEIGHT", cardHeightContent);
  },
  changeDetailObject(context, detailObject) {
    context.commit("CHANGE_DETAIL_OBJECT", detailObject);
  },
  changeGeneSelected(context, geneSelected) {
    context.commit("CHANGE_GENE_SELECTED", geneSelected);
  },
  changeSearch(context, searchContent) {
    context.commit("CHANGE_SEARCH", searchContent);
  },
  changeOption(context, option) {
    context.commit("CHANGE_OPTION", option);
  }
};

const getters = {
  getCardHeight(state) {
    return state.cardHeight;
  },
  getDetailObject(state) {
    return state.detailObject;
  },
  getGeneSelected(state) {
    return state.geneSelected;
  },
  getSearch(state) {
    return state.search;
  },
  getOption(state) {
    return state.optionSelected;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
