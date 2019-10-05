<template>
  <v-layout row wrap>
    <v-flex md12>
      <v-card max-height="450">
        <v-card-title class="justify-center">
          <h4 class="view-title">Graph View</h4>
        </v-card-title>
        <v-layout row wrap>
          <v-card-text>
            <v-chip v-if="cellType1" class="ma-2">{{ cellType1 }}</v-chip>
            <v-chip v-if="cellType2" class="ma-2">{{ cellType2 }}</v-chip>
            <div ref="graph" id="graph"></div>
          </v-card-text>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import * as d3 from "d3";
import _ from "lodash";

import { analyzeGraph } from "@/assets/graph.js";
import { average, countCrossingsGraph, simpleSorter } from "@/assets/utils.js";
import { drawGraph } from "@/assets/draw.js";
import { jsonToGraph } from "@/assets/structure.js";
import { primaryParent } from "@/assets/tangler.js";
import { treeLayout } from "@/assets/layout.js";

export default {
  name: "cell-graph",
  props: {
    cellData: Object
  },
  mounted() {},
  data() {
    return {
      cellType1: "",
      cellType2: "",
      keyValueDict: {},
      selectedCellName: "",
      listLocalCopy: [],
      listSize: 2, // Put this in vuex store at cleanup phase
      loaded: false,
      pathsDict: {}
    };
  },
  methods: {
    /**
     * Create a key value pair where the key is the cell name, and value is a list where index 0 is the cell's
     * parent and index 1 is an array of the cell's children.
     */
    // Turn this function to a Mixin later
    formatToId(cellName) {
      return cellName
        .split(" ")
        .join("-")
        .split("(")
        .join("")
        .split(")")
        .join("")
        .replace(/\//g, "-");
    },
    // Turn this function to a Mixin later
    generateListCopy(originalList) {
      return Object.entries(_.cloneDeep(originalList));
    },
    highlightSearch(filteredDataReverse, selector) {
      let svg = d3.select(selector).select("svg");
      svg.selectAll(".cell").style("opacity", "1.0");

      if (
        filteredDataReverse.length !== 0 &&
        this.$store.getters.getSearch !== ""
      ) {
        // Add filtered out cells to a set for easier access
        let filteredSet = new Set();
        for (let i = 0; i < filteredDataReverse.length; i++) {
          filteredSet.add(filteredDataReverse[i][0]);
        }

        for (let i = 0; i < filteredDataReverse.length; i++) {
          let cellData = filteredDataReverse[i][0];
          let childrenArray = this.keyValueDict[cellData];
          for (let i = 0; i < childrenArray.length; i++) {
            if (!filteredSet.has(childrenArray[i])) {
              svg
                .select(
                  "#path-" +
                    this.formatToId(childrenArray[i]) +
                    "---" +
                    this.formatToId(cellData)
                )
                .transition()
                .style("opacity", "0.1");
              svg
                .select(
                  "#path-" +
                    this.formatToId(cellData) +
                    "---" +
                    this.formatToId(childrenArray[i])
                )
                .transition()
                .style("opacity", "0.1");
            }
          }

          svg
            .select("#circle-" + this.formatToId(filteredDataReverse[i][0]))
            .transition()
            .style("opacity", "0.25");
        }
      }
    },

    // This is the lab version of the cell network graph
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
      // this.fillPathsDict(graph);
    }
  },
  computed: {
    cellSelected: {
      get() {
        return this.$store.getters.getCellSelected;
      }
    },
    filteredData() {
      if (this.$store.getters.getSearch === "") {
        return this.listLocalCopy;
      } else {
        const regex = new RegExp(this.search, "i");
        return this.listLocalCopy.filter(cell => {
          return regex.test(cell[0]) || regex.test(cell[1]);
        });
      }
    },
    filteredDataReverse() {
      if (this.$store.getters.getSearch === "") {
        return [];
      } else {
        const regex = new RegExp(this.search, "i");
        return this.listLocalCopy.filter(cell => {
          return !(regex.test(cell[0]) || regex.test(cell[1]));
        });
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
    cellData() {
      this.loaded = true;
      this.listLocalCopy = this.generateListCopy(this.cellData);
      // Create a key(cell name) value(cell neighbors) list dict
      const keys = Object.entries(this.listLocalCopy);
      keys.forEach(item => {
        this.keyValueDict[item[1][0]] = item[1][1];
      });
      console.log(this.keyValueDict);

      for (let i = 0; i < this.listLocalCopy.length; i++) {
        this.listLocalCopy[i].push(i.toString());
      }
      this.showGraph();
    },
    cellSelected() {
      // There may be asynchronous issue here, need to be handled
      let curList = this.$store.getters.getCellSelected;
      this.cellType1 = "";
      this.cellType2 = "";
      
      if (curList.length == 1) {
        this.cellType1 = curList[0];
      } else if (curList.length == 2) {
        this.cellType1 = curList[0];
        this.cellType2 = curList[1];
      }

      let svgClear = d3.select(this.$refs.graph).select("svg");
      svgClear
        .selectAll(".cell")
        .transition()
        .style("stroke", "#000")
        .style("stroke-width", "1px");

      for (let i = 0; i < curList.length; i++) {
        let svgHighlight = d3.select(this.$refs.graph).select("svg");
        svgHighlight
          .select("#circle-" + this.formatToId(curList[i]))
          .transition()
          .style("stroke", "#FFEE10")
          .style("stroke-width", "2px");
      }
    },
    filteredData() {
      this.highlightSearch(this.filteredDataReverse, this.$refs.graph);
    },
    selectedCellName() {
      let curList = this.$store.getters.getCellSelected;
      while (curList.length >= this.listSize) {
        curList.pop();
      }
      curList.push(this.selectedCellName);
      this.$store.dispatch("changeCellSelected", curList);
    },
    topGeneCellList() {
      let svgClear = d3.select(this.$refs.graph).select("svg");
      let svgHighlight = d3.select(this.$refs.graph).select("svg");

      svgClear
        .selectAll(".cell")
        .transition()
        .style("fill", "#FFF");

      let topGeneCellList = this.$store.getters.getTopGeneCellList;

      for (let i = 0; i < topGeneCellList.length; i++) {
        svgHighlight
          .select("#circle-" + this.formatToId(topGeneCellList[i][0]))
          .transition()
          .style("fill", "#E95C20");
      }
    }
  }
};
</script>

<style scoped>
#graph {
  max-height: 500px;
  /* max-width: 650px; */
}
</style>