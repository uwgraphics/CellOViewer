<template>
  <div id="app">
    <v-app :dark="goDark">
      <v-container bg grid-list-md text-xs-center>
        <v-layout row justify-space-between>
          <v-flex md2>
            <v-switch color="primary" :label="selectedTheme" v-model="goDark"></v-switch>
          </v-flex>
          <v-spacer></v-spacer>
        </v-layout>
        <v-layout row wrap align-center>
          <v-flex>
            <Header msg="Boilerplate for Cell Netowrk Viewer" />
          </v-flex>
        </v-layout>
        <v-layout row wrap align-center>
          <v-flex md12>
            <Graph :cellData="this.loadedData" />
          </v-flex>
        </v-layout>
        <v-layout row wrap align-center>
          <v-flex md5>
            <List :cellData="this.loadedData" />
          </v-flex>
          <v-flex md7>
            <Details />
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import Details from "./components/CellDetails.vue";
import Header from "./components/TheHeader.vue";
import Graph from "./components/CellGraph.vue";
import List from "./components/CellList.vue";

import * as d3 from "d3";

export default {
  name: "app",
  components: {
    Details,
    Header,
    Graph,
    List
  },
  mounted() {
    this.fetchData();
  },
  data: function() {
    return {
      loadedData: {},
      goDark: true,
      search: ""
    };
  },
  methods: {
    async fetchData() {
      let data = await d3.json("./cell_type_graph.json");
      this.loadedData = Object.assign({}, data);
    }
  },
  computed: {
    selectedTheme: function() {
      return this.goDark ? "Dark Theme" : "Light Theme";
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
