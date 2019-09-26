import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  cellDetails: [],
  cellDetailsOption: "",
  cellSelected: [],
  cellSelectedPrevious: "",
  topGeneCellList: [],
  topGeneCellListPrevious: [],
  geneSelected: "",
  optionSelected: "default",
  search: ""
};

const mutations = {
  CHANGE_CELL_DETAILS_OPTION(state, payload) {
    state.cellDetailsOption = payload;
  },
  ADD_TO_CELL_DETAILS(state, payload) {
    state.cellDetails.push(payload);
  },
  CHANGE_CELL_DETAILS(state, payload) {
    state.cellDetails = payload;
  },
  ADD_TO_CELL_SELECTED(state, payload) {
    state.cellSelected.push(payload);
  },
  CHANGE_CELL_SELECTED(state, payload) {
    state.cellSelected = payload;
  },
  POP_FROM_CELL_SELECTED(state) {
    state.cellSelected.pop();
  },
  ADD_TO_TOP_GENE_CELL_LIST(state, payload) {
    state.topGeneCellList.push(payload);
  },
  CHANGE_TOP_GENE_CELL_LIST(state, payload) {
    state.topGeneCellList = payload;
  },
  CHANGE_TOP_GENE_CELL_LIST_PREVIOUS(state, payload) {
    state.topGeneCellListPrevious = payload;
  },
  CHANGE_CELL_SELECTED_PREVIOUS(state, payload) {
    state.cellSelectedPrevious = payload;
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
  addToCellDetails(context, cellDetails) {
    context.commit("ADD_TO_CELL_DETAILS", cellDetails);
  },
  changeCellDetails(context, cellDetails) {
    context.commit("CHANGE_CELL_DETAILS", cellDetails);
  },
  changeCellDetailsOption(context, cellDetailsOption) {
    context.commit("CHANGE_CELL_DETAILS_OPTION", cellDetailsOption);
  },
  addToCellSelected(context, cellSelected) {
    context.commit("ADD_TO_CELL_SELECTED", cellSelected);
  },
  changeCellSelected(context, cellSelected) {
    context.commit("CHANGE_CELL_SELECTED", cellSelected);
  },
  popFromCellSelected(context) {
    context.commit("POP_FROM_CELL_SELECTED");
  },
  addToTopGeneCellList(context, topGeneCellList) {
    context.commit("ADD_TO_TOP_GENE_CELL_LIST", topGeneCellList);
  },
  changeTopGeneCellList(context, topGeneCellList) {
    context.commit("CHANGE_TOP_GENE_CELL_LIST", topGeneCellList);
  },
  changeTopGeneCellListPrevious(context, topGeneCellListPrevious) {
    context.commit("CHANGE_TOP_GENE_CELL_LIST_PREVIOUS", topGeneCellListPrevious);
  },
  changeCellSelectedPrevious(context, cellSelectedPrevious) {
    context.commit("CHANGE_CELL_SELECTED_PREVIOUS", cellSelectedPrevious);
  },
  changeGeneSelected(context, geneSelected) {
    context.commit("CHANGE_GENE_SELECTED", geneSelected);
  },
  changeSearch(context, searchContent) {
    context.commit("CHANGE_SEARCH", searchContent);
  },
  changeOption(context, optionSelected) {
    context.commit("CHANGE_OPTION", optionSelected);
  }
};

const getters = {
  getCellDetails(state) {
    return state.cellDetails;
  },
  getCellDetailsOption(state) {
    return state.cellDetailsOption;
  },
  getCellSelected(state) {
    return state.cellSelected;
  },
  getTopGeneCellList(state) {
    return state.topGeneCellList;
  },
  getTopGeneCellListPrevious(state) {
    return state.topGeneCellListPrevious;
  },
  getCellSelectedPrevious(state) {
    return state.cellSelectedPrevious;
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
