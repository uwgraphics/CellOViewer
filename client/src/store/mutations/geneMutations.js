let geneMutations = {
  CHANGE_GENE_SEARCH_ENTRY(state, payload) {
    state.gene_search_entry = payload;
  },
  CHANGE_GENE_SORT_OPTION(state, payload) {
    state.gene_sort_option = payload;
  },
  CHANGE_SELECTED_GENE(state, payload) {
    state.selected_gene = payload;
  },
};

export default geneMutations;
