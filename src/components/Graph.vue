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
import layout from "./../assets/main";

export default {
  name: "cell-graph",
  props: ["cellData"],
  mounted() {},
  data() {
    return {
      loaded: false
    };
  },
  methods: {
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
        .attr("viewBox", `0 0 ${width} ${height}`);

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
    }
  }
};
</script>

<style scoped>
#graph {
  max-height: 800px;
  overflow-y: auto;
  max-width: 800px;
  overflow-x: auto;
}
</style>