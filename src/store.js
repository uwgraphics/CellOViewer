import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
    search: "",
    cellDataList: []
};

const mutations = {
    CHANGE_SEARCH(state, payload) {
        state.search = payload;
    },
}

const actions = {
    changeSearch(context, searchContent) {
        context.commit("CHANGE_SEARCH", searchContent);
    }
}

const getters = {
    getSearch(state) {
        return state.search;
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
  });