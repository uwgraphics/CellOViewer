let geneStates = {
  gene_search_entry: "",
  gene_sort_option: "default",
  selected_gene: "",
};

let geneGetters = {
  getGeneSearchEntry(state) {
    return state.gene_search_entry;
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
