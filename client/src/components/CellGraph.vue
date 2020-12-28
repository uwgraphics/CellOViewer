<template>
  <v-layout row wrap>
    <v-flex md12>
      <v-card :max-height="maxCardHeight" :color="$vuetify.theme.themes[this.$store.getters.getCurrentThemeMode].background">
        <v-card-title class="justify-center">
          <h4 class="view-title">Cell Ontology View</h4>
          <v-tooltip right max-width="250px">
            <template v-slot:activator="{ on, attrs }">
              <img src="https://raw.githubusercontent.com/uwgraphics/CellOViewer/master/client/static/question.svg" v-bind="attrs" v-on="on" width="22" height="22" style="margin: 4px"/>
            </template>
            <span>Select cell types by clicking a node within the Cell Ontology graph. Selected cell type are highlighted in red.  Cell types that can be discriminated by the currently selected gene are highlighted against faded cell types that cannot be discriminated by the currently selected gene.</span>
          </v-tooltip>
          <v-spacer />
          <v-chip v-if="cellType1" class="ma-2">{{ cellType1 }}</v-chip>
          <v-chip v-if="cellType2" class="ma-2">{{ cellType2 }}</v-chip>
        </v-card-title>
        <v-card-text>
          <div ref="graph" id="graph"></div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable */
import * as d3 from "d3";
import _ from "lodash";

import * as config from "@/config";
import * as util from "@/util";

import { analyzeGraph } from "@/apis/graph.js";
import { average, countCrossingsGraph, simpleSorter } from "@/apis/utils.js";
import { drawGraph } from "@/apis/draw.js";
import { jsonToGraph } from "@/apis/structure.js";
import { primaryParent } from "@/apis/tangler.js";
import { treeLayout } from "@/apis/layout.js";

export default {
  name: "cell-graph",
  props: {
    cellData: Object
  },
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      cellType1: "",
      cellType2: "",
      keyValueDict: {},
      listLocalCopy: [],
      listSize: config.MAX_SELECTED_CELL_TYPE_NUMBER,
      loaded: false,
      loadedDictData: {},
      maxCardHeight: config.FIRST_ROW_CARD_MAX_HEIGHT,
      selectedCellName: "",
      pathsDict: {}
    };
  },
  methods: {
    async fetchData() {
      let data = await d3.json("./top_abs_10_dict.json");
      this.loadedDictData = data;
    },

    /**
     * If any of these edge cases nodes are contained,
     * return true (need to fade the edge in current case)
     */
    linkArrayEdgeCases(edgeCaseCheck) {
      return (
        edgeCaseCheck === "cell" ||
        edgeCaseCheck === "native cell" ||
        edgeCaseCheck === "eukaryotic cell"
      );
    },

    /**
     * Draw, layout and show graph on view
     */
    showGraph() {
      let graph = jsonToGraph(this.cellData);
      analyzeGraph(graph);
      primaryParent(graph);
      for (let i = 0; i < 20; i++) {
        simpleSorter(graph, 3, i);
      }
      graph.links.forEach(
        link =>
          (link.color =
            link.target.primaryParent == link.source ? "#42b983" : "#42b983")
      );
      treeLayout(graph);
      drawGraph(graph, this.$refs.graph, this);
    }
  },
  computed: {
    geneSelected: {
      get() {
        return this.$store.getters.getGeneSelected;
      }
    },
    cellSelected: {
      get() {
        return this.$store.getters.getCellSelected;
      }
    },
    topGeneCellList: {
      get() {
        return this.$store.getters.getTopGeneCellList;
      }
    },
    search: {
      get() {
        return this.$store.getters.getSearch;
      },
      set(value) {
        return this.$store.dispatch("changeSearch", value);
      }
    }
  },
  watch: {
    // This is entry point of where the graph starts rendering
    cellData() {
      this.loaded = true;
      this.listLocalCopy = util.GENERATE_LIST_COPY(this.cellData);
      // Create a key(cell name) value(cell neighbors) list dict
      const keys = Object.entries(this.listLocalCopy);
      keys.forEach(item => {
        this.keyValueDict[item[1][0]] = item[1][1];
      });

      for (let i = 0; i < this.listLocalCopy.length; i++) {
        this.listLocalCopy[i].push(i.toString());
      }
      this.showGraph();
    },
    cellSelected() {
      let curList = this.cellSelected;
      this.cellType1 = "";
      this.cellType2 = "";

      if (curList.length == 1) {
        this.cellType1 = curList[0];
      } else if (curList.length == 2) {
        this.cellType1 = curList[0];
        this.cellType2 = curList[1];
      }
      // Set all cell nodes back to default
      let svgClear = d3.select(this.$refs.graph).select("svg");
      svgClear
        .selectAll(".cell")
        .style("r", config.NODE_RADIUS_DEFAULT)
        .transition()
        .style("fill", config.CELL_TYPE_DEFAULT_COLOR);
      // Highlight the node being selected
      for (let i = 0; i < curList.length; i++) {
        let svgHighlight = d3.select(this.$refs.graph).select("svg");
        svgHighlight
          .select("#circle-" + util.FORMAT_TO_ID(curList[i]))
          .style("r", config.NODE_RADIUS_POPPED)
          .transition()
          .style("fill", config.CELL_TYPE_CHANGED_COLOR);
      }
    },
    // Maintain selected cell type in display list
    selectedCellName() {
      let curList = this.cellSelected;
      while (curList.length >= this.listSize) {
        curList.pop();
      }
      curList.push(this.selectedCellName);
      this.$store.dispatch("changeCellSelected", curList);
    },
    /**
     * Fade cell types that does not contain selected gene as top 10
     */
    geneSelected() {
      let globalThis = this;
      let dict = this.loadedDictData;
      /* Reset default cell opacity(1) */
      let cellReset = d3.select(this.$refs.graph).select("svg");
      cellReset = d3.selectAll(".cell").style("opacity", 1);
      /* Reset link opacity(1) and width(0.5) */
      let linkReset = d3.select(this.$refs.graph).select("svg");
      linkReset = d3
        .selectAll(".link")
        .style("opacity", 1.0)
        .attr("stroke-width", 0.5);

      if (this.geneSelected === "") {
        return;
      }

      let cellTypesThatFitCriteria = new Set();

      /* Determine if each cell type contain selected gene as its top 10 */
      for (const cellType of Object.entries(dict)) {
        let cellName = cellType[0];
        let cellValues = cellType[1];
        let geneExist = false;
        for (const gene of cellValues) {
          let geneName = gene[2];
          if (this.geneSelected === geneName) {
            geneExist = true;
            break;
          }
        }
        /* If a gene is not among a cell type's top 10 */
        if (!geneExist) {
          /* Fade the cell type on graph */
          let svgFade = d3.select(this.$refs.graph).select("svg");
          svgFade
            .select("#circle-" + util.FORMAT_TO_ID(cellName))
            .style("opacity", 0.2);
        } else {
          /* Add it to the cell type set */
          cellTypesThatFitCriteria.add(
            cellName
              .replace(/-/g, " ")
              .replace(/\(/g, "")
              .replace(/\)/g, "")
              .replace(/,/, "")
              .replace(/\//g, "-")
          );
        }
      }

      /**
       * Current edge cases of nodes that needs to be manually faded,
       * need to figure out what happened here.
       */
      let svgEdgeCase1 = d3.select(this.$refs.graph).select("svg");
      svgEdgeCase1
        .select("#circle-" + util.FORMAT_TO_ID("cell"))
        .style("opacity", 0.2);
      let svgEdgeCase2 = d3.select(this.$refs.graph).select("svg");
      svgEdgeCase2
        .select("#circle-" + util.FORMAT_TO_ID("native cell"))
        .style("opacity", 0.2);
      let svgEdgeCase3 = d3.select(this.$refs.graph).select("svg");
      svgEdgeCase3
        .select("#circle-" + util.FORMAT_TO_ID("eukaryotic cell"))
        .style("opacity", 0.2);

      /**
       * Fade links does not have both nodes contained in our node set
       * 
       * MG - a warning...
       * all we know about the actual graph edge is encoded into the ID property
       * so we should be careful to get those correct...
       * 
       * See pathId in draw.js
       * 
       * We assume that the names have been "cleaned up" in draw.js
       */
      d3.select(this.$refs.graph)
        .select("svg")
        .selectAll(".link")
        .each(function(d) {
          let linkArray = d3
            .select(this)
            .attr("id")
            .split("---");
          //name cleanup code moved to draw.js
          if (
            !cellTypesThatFitCriteria.has(linkArray[0]) ||
            !cellTypesThatFitCriteria.has(linkArray[1]) ||
            globalThis.linkArrayEdgeCases(linkArray[0]) ||
            globalThis.linkArrayEdgeCases(linkArray[1])
          ) {
            d3.select(this).style("opacity", 0.2);
          } else {
            // Increase the stroke width if fit all the criteria
            d3.select(this).attr("stroke-width", 3);
          }
        });
    }
  }
};
</script>

<style scoped>
</style>
