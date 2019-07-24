<template>
  <v-layout row wrap align-center>
    <v-flex md12>
      <v-card>
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
            <h2>The graph shall go here</h2>
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

import { analyzeGraph } from "./../assets/graph.js";
import {
  average,
  countCrossingsGraph,
  simpleSorter
} from "./../assets/utils.js";
import { drawGraph, drawGraph2 } from "./../assets/draw.js";
import { jsonToGraph } from "./../assets/data.js";
import { primaryParent } from "./../assets/tangler.js";
import { treeLayout } from "./../assets/layout.js";

export default {
  name: "cell-graph",
  props: {
    cellData: Object
  },
  mounted() {},
  data() {
    return {
      loaded: false
    };
  },
  methods: {
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
        .attr("viewBox", `0 0 ${width+200} ${height+200}`);

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
      // yield svgNode;
    },
    // This is the lab version of the cell network graph
    showDag2() {
      let graph = jsonToGraph(this.cellData);
      analyzeGraph(graph);
      primaryParent(graph);
      
      for (let i = 0; i < 20; i++) {
        simpleSorter(graph, 3, i);
        // console.log(`crossings after ${i + 1}: ${countCrossingsGraph(graph)}`);
      }

      graph.links.forEach(
        link =>
          (link.color =
            link.target.primaryParent == link.source ? "#42b983" : "#42b983")
      );
      treeLayout(graph);
      drawGraph2(graph, this.$refs.graph);
    }
  },
  computed: {
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
      this.showDag();
      this.showDag2();
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