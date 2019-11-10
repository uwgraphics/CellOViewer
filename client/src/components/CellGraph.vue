<template>
  <v-layout row wrap>
    <v-flex md12>
      <v-card :max-height="maxCardHeight">
        <v-card-title class="justify-center">
          <h4 class="view-title">Graph View</h4>
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
    linkArrayEdgeCases(edgeCaseCheck) {
      return (
        edgeCaseCheck === "cell" ||
        edgeCaseCheck === "native cell" ||
        edgeCaseCheck === "eukaryotic cell"
      );
    },
    // Show graph
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
            link.target.primaryParent == link.source ? "#42b983" : "666")
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
    topGeneCellList() {
      let svgClear = d3.select(this.$refs.graph).select("svg");
      let svgFade = d3.select(this.$refs.graph).select("svg");
      // fade all non-related nodes
      // svgFade.selectAll(".cell")
    },
    geneSelected() {
      // Change sorting back to default
      let globalThis = this;
      // Clear both local list and store to receive updated values
      console.log(this.geneSelected);
      console.log(this.loadedDictData);
      console.log(
        d3
          .select(this.$refs.graph)
          .select("svg")
          .selectAll(".link")
      );
      let dict = this.loadedDictData;
      let svgReset = d3.select(this.$refs.graph).select("svg");
      svgReset = d3.selectAll(".cell").style("opacity", 1);
      let strokeWidthReset = d3.select(this.$refs.graph).select("svg");
      strokeWidthReset = d3
        .selectAll(".link")
        .style("opacity", 1.0)
        .attr("stroke-width", 0.5);

      if (this.geneSelected === "") {
        return;
      }

      let geneSpecificCellTypeSet = new Set();
      for (const cellType of Object.entries(dict)) {
        // console.log(cellType);
        let cellName = cellType[0];
        let cellValues = cellType[1];
        let geneExist = false;
        for (const gene of cellValues) {
          // console.log(gene);
          let geneName = gene[2];
          if (this.geneSelected === geneName) {
            geneExist = true;
            break;
          }
        }
        if (!geneExist) {
          // Add cellname to the set if it has the selected gene
          geneSpecificCellTypeSet.add(
            cellName
              .replace(/-/g, " ")
              .replace(/\(/g, "")
              .replace(/\)/g, "")
              .replace(/,/, "")
              .replace(/\//g, "-")
          );
          let svgFade = d3.select(this.$refs.graph).select("svg");
          svgFade
            .select("#circle-" + util.FORMAT_TO_ID(cellName))
            .style("opacity", 0.2);
        }
      }
      // Currently need to handle these edge cases, need to figure out what happened here
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

      d3.select(this.$refs.graph)
        .select("svg")
        .selectAll(".link")
        .each(function(d) {
          let linkArray = d3
            .select(this)
            .attr("id")
            .split("---");
          for (let i = 0; i < linkArray.length; i++) {
            linkArray[i] = linkArray[i]
              .replace(/-/g, " ")
              .replace(/\(/g, "")
              .replace(/\)/g, "")
              .replace(/,/, "")
              .replace(/\//g, "-");
          }
          if (
            geneSpecificCellTypeSet.has(linkArray[0]) ||
            geneSpecificCellTypeSet.has(linkArray[1]) ||
            globalThis.linkArrayEdgeCases(linkArray[0]) ||
            globalThis.linkArrayEdgeCases(linkArray[1])
          ) {
            d3.select(this).style("opacity", 0.2);
          } else {
            console.log("Here");
            console.log(linkArray[0]);
            console.log(linkArray[1]);
            d3.select(this).attr("stroke-width", 3);
          }
        });
    }
  }
};
</script>

<style scoped>
</style>