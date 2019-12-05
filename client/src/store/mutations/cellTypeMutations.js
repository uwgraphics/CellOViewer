let cellTypeMutations = {
  ADD_TO_CELL_TYPE_DETAILS_LIST(state, payload) {
    state.cell_type_details_list.push(payload);
  },
  CHANGE_CELL_TYPE_DETAILS_LIST(state, payload) {
    state.cell_type_details_list = payload;
  },

  ADD_TO_SELECTED_CELL_TYPE_LIST(state, payload) {
    state.selected_cell_type_list.push(payload);
  },
  CHANGE_SELECTED_CELL_TYPE_LIST(state, payload) {
    state.selected_cell_type_list = payload;
  },
  POP_FROM_SELECTED_CELL_TYPE_LIST(state) {
    state.selected_cell_type_list.pop();
  },

  CHANGE_CELL_TYPE_GRAPH_STRUCTURE_DATA(state, payload) {
    state.cell_type_graph_structure_data = payload;
  },

  CHANGE_CELL_TYPE_SEARCH_ENTRY(state, payload) {
    state.cell_type_search_entry = payload;
  },

  CHANGE_CELL_TYPE_SEARCH_ENTRY_IN_GENE_DETAILS_VIEW(state, payload) {
    state.cell_type_search_entry_in_gene_details_view = payload;
  },

  CHANGE_CELL_TYPE_SORT_OPTION(state, payload) {
    state.cell_type_sort_option = payload;
  },

  ADD_TO_CELL_TYPES_THAT_HAVE_SELECTED_GENE_AS_TOP_VALUE(state, payload) {
    state.cell_types_that_have_selected_gene_as_top_value.push(payload);
  },
  CHANGE_CELL_TYPES_THAT_HAVE_SELECTED_GENE_AS_TOP_VALUE(state, payload) {
    state.cell_types_that_have_selected_gene_as_top_value = payload;
  },
};

export default cellTypeMutations;
