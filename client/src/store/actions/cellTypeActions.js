let cellTypeActions = {
  addToCellTypeDetailsList(context, cell_type_details_list) {
    context.commit("ADD_TO_CELL_TYPE_DETAILS_LIST", cell_type_details_list);
  },
  changeCellTypeDetailsList(context, cell_type_details_list) {
    context.commit("CHANGE_CELL_TYPE_DETAILS_LIST", cell_type_details_list);
  },

  addToSelectedCellTypeList(context, selected_cell_type_list) {
    context.commit("ADD_TO_SELECTED_CELL_TYPE_LIST", selected_cell_type_list);
  },
  changeSelectedCellTypeList(context, selected_cell_type_list) {
    context.commit("CHANGE_SELECTED_CELL_TYPE_LIST", selected_cell_type_list);
  },
  popFromSelectedCellTypeList(context) {
    context.commit("POP_FROM_SELECTED_CELL_TYPE_LIST");
  },

  changeCellTypeGraphStructureData(context, data) {
    context.commit("CHANGE_CELL_TYPE_GRAPH_STRUCTURE_DATA", data);
  },

  changeCellTypeSearchEntry(context, searchContent) {
    context.commit("CHANGE_CELL_TYPE_SEARCH_ENTRY", searchContent);
  },

  changeCellTypeSearchEntryInGeneDetailsView(context, searchContent) {
    context.commit("CHANGE_CELL_TYPE_SEARCH_ENTRY_IN_GENE_DETAILS_VIEW", searchContent);
  },

  addToCellTypesThatHaveSelectedGeneAsTopValue(context, cell_types_that_have_selected_gene_as_top_value) {
    context.commit("ADD_TO_CELL_TYPES_THAT_HAVE_SELECTED_GENE_AS_TOP_VALUE", cell_types_that_have_selected_gene_as_top_value);
  },
  changeCellTypesThatHaveSelectedGeneAsTopValue(context, cell_types_that_have_selected_gene_as_top_value) {
    context.commit("CHANGE_CELL_TYPES_THAT_HAVE_SELECTED_GENE_AS_TOP_VALUE", cell_types_that_have_selected_gene_as_top_value);
  },
};

export default cellTypeActions;