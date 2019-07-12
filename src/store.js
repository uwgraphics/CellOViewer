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
    CHANGE_LIST(state, payload) {
        state.cellDataList = payload;
    }
}

const actions = {
    changeSearch(context, searchContent) {
        context.commit("CHANGE_SEARCH", searchContent);
    },
    changeList(context, list) {
        context.commit("CHANGE_LIST", list);
    }
}

const getters = {
    getSearch(state) {
        return state.search;
    },
    getList(state) {
        return state.cellDataList;
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
  });