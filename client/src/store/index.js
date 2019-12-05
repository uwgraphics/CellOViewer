import Vue from "vue";
import Vuex from "vuex";

import cellTypeModule from "./modules/cellType";
import cellTypeMutations from "./mutations/cellTypeMutations";
import cellTypeActions from "./actions/cellTypeActions";

import geneModule from "./modules/gene";
import geneMutations from "./mutations/geneMutations";
import geneActions from "./actions/geneActions";

Vue.use(Vuex);

const state = {
  ...cellTypeModule.state,
  ...geneModule.state,
  currentThemeMode: "dark"
};

const mutations = {
  ...cellTypeMutations,
  ...geneMutations,
  CHANGE_CURRENT_THEME_MODE(state, payload) {
    state.currentThemeMode = payload;
  }
};

const actions = {
  ...cellTypeActions,
  ...geneActions,
  changeCurrentThemeMode(context, mode) {
    context.commit("CHANGE_CURRENT_THEME_MODE", mode);
  }
};

const getters = {
  ...cellTypeModule.getters,
  ...geneModule.getters,
  getCurrentThemeMode(state) {
    return state.currentThemeMode;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
