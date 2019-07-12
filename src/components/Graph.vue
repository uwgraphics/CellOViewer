<template>
  <v-layout row wrap align-center>
    <v-flex md12>
      <v-card height="600">
        <v-layout row wrap align-center>
          <v-spacer></v-spacer>
          <v-flex md3 mr-3>
            <v-text-field
              v-model="search"
              label="search the cell"
              single-line
              hide-details
              hide-no-data
            ></v-text-field>
          </v-flex>
          <v-card-text>
            <h2>The graph shall go here</h2>
            <div ref="graph"></div>
          </v-card-text>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import * as d3 from "d3";
import * as d3Dag from "d3-dag";

export default {
  name: "cell-graph",
  props: ["cellData"],
  mounted() {},
  data() {
    return {
      loaded: false,
      search: ""
    };
  },
  methods: {
    showDag() {
      let width = 500;
      let height = 500;
      let formatData = d3Dag.dagStratify(this.cellData);
      let dag = d3Dag.dagHierarchy(formatData);

      let svg = d3.select(this.$refs.graph)
        .append(svg)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${width} ${height}`);
      // svg.append(d3Dag.layeringLongestPath(dag));
      console.log(dag);
      // Continue to load the svg graph into the graph component
    }
  },
  computed: {},
  watch: {
    cellData() {
      this.loaded = true;
      this.showDag();
    }
  }
};
</script>

<style>
</style>