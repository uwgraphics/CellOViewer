<template>
  <v-layout row wrap align-center>
    <v-flex md12>
      <v-card height="700">
        <v-card-title class="justify-center">
          <h2 class="title">Graph View</h2>
        </v-card-title>
        <v-layout row wrap align-center>
          <v-spacer></v-spacer>
          <v-flex md3 mr-3>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="search the cell"
              single-line
              hide-details
              hide-no-data
            ></v-text-field>
          </v-flex>
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
      selectedCellName: "",
      keyValueDict: [],
      listLocalCopy: [],
      loaded: false
    };
  },
  methods: {
    // Turn this function to a Mixin later
    generateListCopy(originalList) {
      return Object.entries(_.cloneDeep(originalList));
    },
    highlightSearch(filteredData, selector) {
      let svg = d3.select(selector).select("svg");
      svg.selectAll(".cell").style("fill", "#FFF");
      if (
        filteredData.length !== this.listLocalCopy.length &&
        this.$store.getters.getSearch !== ""
      ) {
        for (let i = 0; i < filteredData.length; i++) {
          svg
            .select(
              "#circle-" +
                filteredData[i][0]
                  .split(" ")
                  .join("-")
                  .split("(")
                  .join("")
                  .split(")")
                  .join("")
                  .replace(/\//g, "-")
            )
            .transition()
            .style("fill", "#ff7878");
        }
      }
    },
    // This is the D3-DAG version of the cell network graph
    showDag() {
      let width = 2000;
      let height = 2000;
      // Change our dataset to a node links structure(for dag structure conversion)
      let links = [];
      Object.keys(this.cellData).forEach(node => {
        let children = this.cellData[node];
        children.forEach(child => {
          links.push([node, child]);
        });
      });
      // Turn into DAG format data
      let transformedData = d3Dag.dagConnect()(links);
      let layout = d3Dag.sugiyama().decross(d3Dag.decrossTwoLayer())(
        transformedData
      );
      console.log(layout);
      console.log("LINKS", layout.links());
      console.log("NODES", layout.descendants());

      let svg = d3
        .select(this.$refs.graph)
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${width + 50} ${height + 50}`);

      const line = d3
        .line()
        .curve(d3.curveCatmullRom)
        .x(d => d.x * width)
        .y(d => d.y * height);

      const g = svg.append("g").attr("transform", `translate(${0},${0})`);

      g.append("g")
        .selectAll("path")
        .data(layout.links())
        .enter()
        .append("path")
        .attr("d", ({ source, target, data }) =>
          line(
            [
              {
                x: source.x,
                y: source.y
              }
            ].concat(data.points || [], [
              {
                x: target.x,
                y: target.y
              }
            ])
          )
        )
        .attr("fill", "none")
        .attr("stroke", "#42b983");

      const nodes = g
        .append("g")
        .selectAll("g")
        .data(layout.descendants())
        .enter()
        .append("g")
        .attr(
          "transform",
          ({ x, y }) => `translate(${x * width}, ${y * height})`
        );

      nodes
        .append("circle")
        .attr("r", 5)
        .attr("fill", "white")
        .attr("stroke", "black");

      // Add text, which screws up measureement
      nodes
        .append("text")
        .text(d => d.id)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .style("font-size", "2px");
    },
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
      // this.showDag();
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
      console.log("changed");
      console.log(this.cellSelected);
      console.log(this.$store.getters.getCellSelectedPrevious);
      let svgClear = d3.select(this.$refs.graph).select("svg");
      svgClear
        .select(
          "#circle-" +
            this.$store.getters.getCellSelectedPrevious
              .split(" ")
              .join("-")
              .split("(")
              .join("")
              .split(")")
              .join("")
              .replace(/\//g, "-")
        )
        .transition()
        .style("fill", "#8F9296");

      let svgHighlight = d3.select(this.$refs.graph).select("svg");
      svgHighlight
        .select(
          "#circle-" +
            this.cellSelected
              .split(" ")
              .join("-")
              .split("(")
              .join("")
              .split(")")
              .join("")
              .replace(/\//g, "-")
        )
        .transition()
        .style("fill", "#026CDF"); // Change to border later

      this.$store.dispatch("changeCellSelectedPrevious", this.cellSelected);
    },
    filteredData() {
      this.highlightSearch(this.filteredData, this.$refs.graph);
    },
    selectedCellName() {
      this.$store.dispatch("changeCellSelected", this.selectedCellName);
    }
  }
};
</script>

<style scoped>
#graph {
  max-height: 800px;
  overflow-y: auto;
  max-width: 1200px;
  overflow-x: auto;
}
</style>