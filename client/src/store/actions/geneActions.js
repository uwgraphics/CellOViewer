let geneActions = {
  changeGeneSearchEntryInSearchView(context, searchContent) {
    context.commit("CHANGE_GENE_SEARCH_ENTRY_IN_SEARCH_VIEW", searchContent);
  },
  changeGeneSearchEntryInCellDetailsView(context, searchContent) {
    context.commit("CHANGE_GENE_SEARCH_ENTRY_IN_CELL_DETAILS_VIEW", searchContent);
  },
  changeGeneSortOption(context, geneSortOption) {
    context.commit("CHANGE_GENE_SORT_OPTION", geneSortOption);
  },
  changeSelectedGene(context, selectedGene) {
    context.commit("CHANGE_SELECTED_GENE", selectedGene);
  },
};

export default geneActions;
