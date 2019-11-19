import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  cellDetails: [],
  cellSelected: [],
  cellSelectedPrevious: "",
  cellTypeGraphData: {},
  currentThemeMode: "dark",
  topGeneCellList: [],
  topGeneCellListPrevious: [],
  topGeneDictData: {},
  geneSearchOption: "default",
  geneSelected: "",
  optionSelected: "default",
  cellInGeneSearch: "",
  geneSearchFromSearchView: "",
  geneSearch: "",
  search: ""
};

const mutations = {
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
  CHANGE_CELL_TYPE_GRAPH_DATA(state, payload) {
    state.cellTypeGraphData = payload;
  },
  CHANGE_CURRENT_THEME_MODE(state, payload) {
    state.currentThemeMode = payload;
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
  CHANGE_TOP_GENE_DICT_DATA(state, payload) {
    state.topGeneDictData = payload;
  },
  CHANGE_GENE_SEARCH_OPTION(state, payload) {
    state.geneSearchOption = payload;
  },
  CHANGE_GENE_SELECTED(state, payload) {
    state.geneSelected = payload;
  },
  CHANGE_CELL_IN_GENE_SEARCH(state, payload) {
    state.cellInGeneSearch = payload;
  },
  CHANGE_GENE_SEARCH(state, payload) {
    state.geneSearch = payload;
  },
  CHANGE_GENE_SEARCH_FROM_SEARCH_VIEW(state, payload) {
    state.geneSearchFromSearchView = payload;
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
  addToCellSelected(context, cellSelected) {
    context.commit("ADD_TO_CELL_SELECTED", cellSelected);
  },
  changeCellSelected(context, cellSelected) {
    context.commit("CHANGE_CELL_SELECTED", cellSelected);
  },
  popFromCellSelected(context) {
    context.commit("POP_FROM_CELL_SELECTED");
  },
  changeCellTypeGraphData(context, data) {
    context.commit("CHANGE_CELL_TYPE_GRAPH_DATA", data);
  },
  changeCurrentThemeMode(context, mode) {
    context.commit("CHANGE_CURRENT_THEME_MODE", mode)
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
  changeTopGeneDictData(context, data) {
    context.commit("CHANGE_TOP_GENE_DICT_DATA", data);
  },
  changeGeneSearchOption(context, geneSearchOption) {
    context.commit("CHANGE_GENE_SEARCH_OPTION", geneSearchOption);
  },
  changeGeneSelected(context, geneSelected) {
    context.commit("CHANGE_GENE_SELECTED", geneSelected);
  },
  changeCellInGeneSearch(context, searchContent) {
    context.commit("CHANGE_CELL_IN_GENE_SEARCH", searchContent);
  },
  changeGeneSearch(context, searchContent) {
    context.commit("CHANGE_GENE_SEARCH", searchContent);
  },
  changeGeneSearchFromSearchView(context, searchContent) {
    context.commit("CHANGE_GENE_SEARCH_FROM_SEARCH_VIEW", searchContent);
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
  getCellTypeGraphData(state) {
    return state.cellTypeGraphData;
  },
  getCurrentThemeMode(state) {
    return state.currentThemeMode;
  },
  getTopGeneDictData(state) {
    return state.topGeneDictData;
  },
  getGeneSearchOption(state) {
    return state.geneSearchOption;
  },
  getGeneSelected(state) {
    return state.geneSelected;
  },
  getCellInGeneSearch(state) {
    return state.cellInGeneSearch;
  },
  getGeneSearch(state) {
    return state.geneSearch;
  },
  getGeneSearchFromSearchView(state) {
    return state.geneSearchFromSearchView;
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
