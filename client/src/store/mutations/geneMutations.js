let geneMutations = {
  CHANGE_GENE_SEARCH_ENTRY_IN_SEARCH_VIEW(state, payload) {
    state.gene_search_entry_in_search_view = payload;
  },
  CHANGE_GENE_SEARCH_ENTRY_IN_CELL_DETAILS_VIEW(state, payload) {
    state.gene_search_entry_in_cell_details_view = payload;
  },
  CHANGE_GENE_SORT_OPTION(state, payload) {
    state.gene_sort_option = payload;
  },
  CHANGE_SELECTED_GENE(state, payload) {
    state.selected_gene = payload;
  },
};

export default geneMutations;
