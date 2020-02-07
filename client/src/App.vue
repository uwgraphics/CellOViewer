<template>
  <div id="app">
    <v-app :dark="setTheme">
      <!--Header Section-->
      <v-container fluid>
        <v-layout>
          <img class="logo" color="primary" src="../public/cello.svg" />
          <v-spacer></v-spacer>
          <v-switch
            v-model="goDark"
            color="primary"
            :label="selectedTheme"
            class="switch"
          />
        </v-layout>
        <Header msg="CellO Viewer" />
      </v-container>

      <!--Body Section-->
      <v-container bg grid-list-md fluid>
        <v-layout row wrap>
          <!-- 
          Search View 
          -->
          <v-flex md5>
            <SearchView
              :cell-data="this.$store.getters.getCellTypeGraphStructureData"
            />
          </v-flex>
          <!-- 
          Graph View 
          -->
          <v-flex md7>
            <GraphView
              :cell-data="this.$store.getters.getCellTypeGraphStructureData"
            />
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <!-- 
          Gene Details View 
          -->
          <v-flex md5>
            <GeneDetailsView />
          </v-flex>
          <!-- 
          Cell Details View 
          -->
          <v-flex md7>
            <CellDetailsView />
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
import GraphView from "@/components/GraphView.vue";
import GeneDetailsView from "@/components/GeneDetailsView.vue";
import CellDetailsView from "@/components/CellDetailsView.vue";

/**
 * Packages
 */
import * as d3 from "d3";

export default {
  name: "App",

  components: {
    Header,
    SearchView,
    GraphView,
    GeneDetailsView,
    CellDetailsView
  },

  data: function() {
    return {
      goDark: true
    };
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
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    // Fetch all json data and store it in vuex for children components to use
    async fetchData() {
      let cellTypeGraphStructureData = await d3.json("./cell_type_graph.json");
      this.$store.dispatch(
        "changeCellTypeGraphStructureData",
        cellTypeGraphStructureData
      );
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
.logo {
  margin: 5px;
  height: 48px;
  width: 48px;
}
.switch {
  margin: 10px;
}
.index {
  color: var(--v-primary-base);
  font-weight: bold;
  margin: 10px;
}
a,
h3 {
  color: var(--v-primary-base);
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
