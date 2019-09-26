<template>
  <v-layout row wrap>
    <v-flex md12>
      <v-card max-height="600">
        <v-card-title class="justify-center">
          <v-flex md4 sm4>
            <h2 class="title">Graph View</h2>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex md5 mr-5>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="search the cell"
              single-line
              hide-details
              hide-no-data
            ></v-text-field>
          </v-flex>
        </v-card-title>
        <v-layout row wrap>
          <v-card-text>
            <div ref="graph" id="graph"></div>
          </v-card-text>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import * as d3 from "d3";
import * as d3Dag from "d3-dag";
import _ from "lodash";

import { analyzeGraph } from "@/assets/graph.js";
import { average, countCrossingsGraph, simpleSorter } from "@/assets/utils.js";
import { drawGraph, drawGraphLab } from "@/assets/draw.js";
import { jsonToGraph } from "@/assets/data.js";
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

    // This is the D3-DAG version of the cell network graph, might still be useful
    // showDag() {
    //   let width = 2000;
    //   let height = 2000;
    //   // Change our dataset to a node links structure(for dag structure conversion)
    //   let links = [];
    //   Object.keys(this.cellData).forEach(node => {
    //     let children = this.cellData[node];
    //     children.forEach(child => {
    //       links.push([node, child]);
    //     });
    //   });
    //   // Turn into DAG format data
    //   let transformedData = d3Dag.dagConnect()(links);
    //   let layout = d3Dag.sugiyama().decross(d3Dag.decrossTwoLayer())(
    //     transformedData
    //   );
    //   console.log(layout);
    //   console.log("LINKS", layout.links());
    //   console.log("NODES", layout.descendants());

    //   let svg = d3
    //     .select(this.$refs.graph)
    //     .append("svg")
    //     .attr("preserveAspectRatio", "xMinYMin meet")
    //     .attr("viewBox", `0 0 ${width + 50} ${height + 50}`);

    //   const line = d3
    //     .line()
    //     .curve(d3.curveCatmullRom)
    //     .x(d => d.x * width)
    //     .y(d => d.y * height);

    //   const g = svg.append("g").attr("transform", `translate(${0},${0})`);

    //   g.append("g")
    //     .selectAll("path")
    //     .data(layout.links())
    //     .enter()
    //     .append("path")
    //     .attr("d", ({ source, target, data }) =>
    //       line(
    //         [
    //           {
    //             x: source.x,
    //             y: source.y
    //           }
    //         ].concat(data.points || [], [
    //           {
    //             x: target.x,
    //             y: target.y
    //           }
    //         ])
    //       )
    //     )
    //     .attr("fill", "none")
    //     .attr("stroke", "#42b983");

    //   const nodes = g
    //     .append("g")
    //     .selectAll("g")
    //     .data(layout.descendants())
    //     .enter()
    //     .append("g")
    //     .attr(
    //       "transform",
    //       ({ x, y }) => `translate(${x * width}, ${y * height})`
    //     );

    //   nodes
    //     .append("circle")
    //     .attr("r", 5)
    //     .attr("fill", "white")
    //     .attr("stroke", "black");

    //   // Add text, which screws up measureement
    //   nodes
    //     .append("text")
    //     .text(d => d.id)
    //     .attr("text-anchor", "middle")
    //     .attr("alignment-baseline", "middle")
    //     .style("font-size", "2px");
    // },

    // This is the lab version of the cell network graph
    showDag2() {
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
      drawGraphLab(graph, this.$refs.graph, this);
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
      this.showDag2();
    },
    cellSelected() {
      // There may be asynchronous issue here, need to be handled
      let curList = this.$store.getters.getCellSelected;

      let svgClear = d3.select(this.$refs.graph).select("svg");
      svgClear
        .selectAll(".cell")
        .transition()
        .style("stroke", "#000")
        .style("stroke-width", "1px");

      for (let i = 0; i < curList.length; i++) {
        let svgHighlight = d3.select(this.$refs.graph).select("svg");
        let highlightedCell = svgHighlight
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
  max-height: 650px;
  max-width: 650px;
}
</style>