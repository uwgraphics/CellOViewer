<template>
  <v-layout row wrap align-center>
    <v-flex md12>
      <v-card max-height="600">
        <v-card-title class="justify-center">
          <h2 class="title">Gene Details View</h2>
          <v-spacer></v-spacer>
          <v-btn medium color="red" justify-right dark @click="removeGeneDetails">
            <v-icon dark>remove_circle</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex md12 v-if="geneNotEmpty()">
              <h3 class="sub-title">Gene: {{ geneSelected }}</h3>
              <v-list :class="{ 'max-height': listHeight }" class="list">
                <v-list-item
                  v-for="(value, index) in filteredGeneCellList"
                  :key="index"
                  @click="setCellSelected(value[0])"
                >
                  <v-layout>
                    <v-flex md3 offset-md1 class="index">{{ value[0] }}:&nbsp;</v-flex>
                    <v-flex md6 offset-md1>{{ value[1] }}</v-flex>
                  </v-layout>
                </v-list-item>
              </v-list>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "gene-details",
  props: [],
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      filteredGeneCellList: [],
      cellTypeNames: [],
      listHeight: "400px",
      loadedDictData: {}
    };
  },
  methods: {
    async fetchData() {
      let data = await d3.json("./top_abs_10_dict.json");
      this.loadedDictData = Object.assign({}, data);
      // this.cellTypeNames = Object.keys(this.loadedDictData);
      // console.log(this.cellTypeNames);
    },
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
    geneNotEmpty() {
      return this.geneSelected !== "";
    },
    removeGeneDetails() {
      this.$store.dispatch("changeGeneSelected", "");
    },
    setCellSelected(cellName) {
      let curList = this.$store.getters.getCellSelected;
      if (curList.length > 0) {
        curList.pop();
      }
      curList.push(cellName);
      this.$store.dispatch("changeCellSelected", curList);
    },
    topGeneDataExist(topGenes, cellTypeName) {
      return typeof topGenes[this.geneSelected] !== "undefined";
    }
  },
  computed: {
    geneSelected: {
      get() {
        return this.$store.getters.getGeneSelected;
      }
    }
  },
  watch: {
    geneSelected() {
      let globalThis = this;
      globalThis.filteredGeneCellList = [];
      this.$store.dispatch("changeTopGeneCellList", []);
      console.log(this.loadedDictData);
      console.log(globalThis.$store.getters.getTopGeneCellList);
      for (const [key, value] of Object.entries(this.loadedDictData)) {
        (function(outerKey, outerValue) {
          for (const [key, value] of Object.entries(outerValue)) {
            if (key === globalThis.geneSelected) {
              globalThis.filteredGeneCellList.push([outerKey, value]);
              globalThis.$store.dispatch("addToTopGeneCellList", [
                outerKey,
                value
              ]);
              console.log(globalThis.$store.getters.getTopGeneCellList);
            }
          }
        })(key, value);
      }
    }
  }
};
</script>

<style scoped>
v-card-title {
  margin: 100px;
}
.list {
  max-height: 400px;
  overflow-y: auto;
}
</style>