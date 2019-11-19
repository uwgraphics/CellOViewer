<template>
  <div id="app">
    <v-app
      :dark="setTheme"
    >
      <!--Header Section-->
      <v-container fluid>
        <v-switch
          color="primary"
          :label="selectedTheme"
          v-model="goDark"
          class="switch"
        ></v-switch>
        <Header msg="Cell Network Viewer" />
      </v-container>

      <!--Body Section-->
      <v-container bg grid-list-md fluid>
        <v-layout row wrap>
          <!-- 
          Search View 
          -->
          <v-flex md5>
            <SearchView :cellData="this.$store.getters.getCellTypeGraphData" />
          </v-flex>
          <!-- 
          Graph View 
          -->
          <v-flex md7>
            <Graph :cellData="this.$store.getters.getCellTypeGraphData" />
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
/**
 * Views
 */
import Header from "@/components/TheHeader.vue";
import SearchView from "@/components/SearchView.vue";
import Graph from "@/components/CellGraph.vue";
import GeneDetails from "@/components/GeneDetails.vue";
import CellDetails from "@/components/CellDetails.vue";

/**
 * Packages
 */
import * as d3 from "d3";

export default {
  name: "app",
  components: {
    Header,
    SearchView,
    Graph,
    GeneDetails,
    CellDetails
  },
  mounted() {
    this.fetchData();
  },
  data: function() {
    return {
      goDark: true
    };
  },
  methods: {
    // Fetch all json data and store it in vuex for children components to use
    async fetchData() {
      let cellTypeGraphData = await d3.json("./cell_type_graph.json");
      this.$store.dispatch("changeCellTypeGraphData", cellTypeGraphData);
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
        this.$store.dispatch("changeCurrentThemeMode", "dark");
        return (this.$vuetify.theme.dark = true);
      } else {
        this.$store.dispatch("changeCurrentThemeMode", "light");
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
