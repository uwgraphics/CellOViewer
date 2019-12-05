let cellTypeStates = {
  cell_type_details_list: [],
  selected_cell_type_list: [],
  cell_type_graph_structure_data: {},
  cell_type_search_entry: "",
  cell_type_search_entry_in_gene_details_view: "",
  cell_types_that_have_selected_gene_as_top_value: [],
};

let cellTypeStatesGetters = {
  getCellTypeList(state) {
    return state.cell_type_details_list;
  },
  getSelectedCellTypeList(state) {
    return state.selected_cell_type_list;
  },
  getCellTypeGraphStructureData(state) {
    return state.cell_type_graph_structure_data;
  },
  getCellTypeSearchEntry(state) {
    return state.cell_type_search_entry;
  },
  getCellTypeSearchEntryInGeneDetailsView(state) {
    return state.cell_type_search_entry_in_gene_details_view;
  },
  getCellTypesThatHaveSelectedGeneAsTopValue(state) {
    return state.cell_types_that_have_selected_gene_as_top_value;
  },
};

let cellTypeModule = {
    state: cellTypeStates,
    getters: cellTypeStatesGetters
}

export default cellTypeModule;
