let geneStates = {
  gene_search_entry_in_search_view: "",
  gene_search_entry_in_cell_details_view: "",
  gene_sort_option: "default",
  selected_gene: "",
};

let geneGetters = {
  getGeneSearchEntryInSearchView(state) {
    return state.gene_search_entry_in_search_view;
  },
  getGeneSearchEntryInCellDetailsView(state) {
    return state.gene_search_entry_in_cell_details_view;
  },
  getGeneSortOption(state) {
    return state.gene_sort_option;
  },
  getSelectedGene(state) {
    return state.selected_gene;
  },
};

let geneModule = {
  state: geneStates,
  getters: geneGetters
};

export default geneModule;
