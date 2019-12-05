let geneActions = {
  changeGeneSearchEntry(context, searchContent) {
    context.commit("CHANGE_GENE_SEARCH_ENTRY", searchContent);
  },
  changeGeneSortOption(context, geneSortOption) {
    context.commit("CHANGE_GENE_SORT_OPTION", geneSortOption);
  },
  changeSelectedGene(context, selectedGene) {
    context.commit("CHANGE_SELECTED_GENE", selectedGene);
  },
};

export default geneActions;
