<template>
  <div id="app">
    <v-app :dark="setTheme">
      <!--Header Section-->
      <v-container fluid>
        <v-switch color="primary" :label="selectedTheme" v-model="goDark" class="switch"></v-switch>
        <Header msg="Cell Network Viewer" />
      </v-container>

      <!--Body Section-->
      <v-container bg grid-list-md fluid>
        <v-layout row wrap>
          <!-- 
          Search View 
          -->
          <v-flex md5>
            <SearchView :cellData="this.loadedData" />
          </v-flex>
          <!-- 
          Graph View 
          -->
          <v-flex md7>
            <Graph :cellData="this.loadedData" />
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <!-- 
          Gene Details View 
          -->
          <v-flex md5>
            <GeneDetails />
          </v-flex>
          <!-- 
          Cell Details View 
          -->
          <v-flex md7>
            <CellDetails />
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
import SearchView from "@/components/SearchView.vue";

import * as d3 from "d3";

export default {
  name: "app",
  components: {
    Header,
    Graph,
    SearchView,
    CellDetails,
    GeneDetails
  },
  mounted() {
    this.fetchData();
  },
  data: function() {
    return {
      loadedData: {},
      goDark: true
    };
  },
  methods: {
    // Fetch cell type graph data
    async fetchData() {
      this.loadedData = await d3.json("./cell_type_graph.json");
    }
  },
  computed: {
    // Display which theme is currently on
    selectedTheme() {
      return this.goDark ? "Dark Theme" : "Light Theme";
    },
    // Toggle between light and dark theme
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
.switch {
  margin: 20px;
}
a,
h3 {
  color: #42b983;
}
.index {
  color: #42b983;
  font-weight: bold;
}
@import url("https://fonts.googleapis.com/css?family=BioRhyme&display=swap");
.view-title {
  font-family: "BioRhyme", serif;
}
.sub-title {
  font-weight: bold;
  text-align: left;
}
</style>
