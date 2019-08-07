<template>
  <div id="app">
    <v-app :dark="setTheme">
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
          <v-flex md7>
            <Graph :cellData="this.loadedData" />
          </v-flex>
          <v-flex md5>
            <List :cellData="this.loadedData" />
          </v-flex>
        </v-layout>
        <v-layout row wrap align-center>
          <v-flex md7>
            <CellDetails />
          </v-flex>
          <v-flex md5>
            <GeneDetails />
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import CellDetails from "@/components/CellDetails.vue";
import Header from "@/components/TheHeader.vue";
import GeneDetails from "@/components/GeneDetails.vue";
import Graph from "@/components/CellGraph.vue";
import List from "@/components/CellList.vue";

import * as d3 from "d3";

export default {
  name: "app",
  components: {
    CellDetails,
    Header,
    GeneDetails,
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
    selectedTheme() {
      return this.goDark ? "Dark Theme" : "Light Theme";
    },
    setTheme() {
      if (this.goDark == true) {
        return (this.$vuetify.theme.dark = true);
      } else {
        return (this.$vuetify.theme.dark = false);
      }
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
a, h3 {
  color: #42b983;
}
.index {
  color: #42b983;
  font-weight: bold;
}
.sub-title {
  color: #42b983;
  font-weight: bold;
  text-align: left;
}
</style>
