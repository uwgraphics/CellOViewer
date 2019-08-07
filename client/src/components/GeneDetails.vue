<template>
  <v-layout row wrap align-center>
    <v-flex md12>
      <v-card :class="{ height:cardHeight }">
        <v-card-title class="justify-center">
          <h2 class="title">Gene Details View</h2>
        </v-card-title>
        <v-card-text>
          <v-btn class="ma-2" color="red" dark @click="removeGeneDetails">
            Remove Gene Details
            <v-icon dark right>remove_circle</v-icon>
          </v-btn>
          <v-layout row wrap id="list" :class="{ 'max-height': listHeight }">
            <v-flex md12 v-if="geneNotEmpty()">
              <h3 class="sub-title">Gene: {{ geneSelected }}</h3>
              <v-list>
                <v-list-item v-for="(value, index) in filteredGeneCellList" :key="index">
                  <v-layout>
                    <v-flex md12>
                      <v-list-item @click="setCellSelected(value[0])">
                        <span class="index">{{ value[0] }}:&nbsp;</span>
                        <span>{{ value[1] }}</span>
                      </v-list-item>
                    </v-flex>
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
      cardHeight: this.$store.getters.getCardHeight,
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
    geneNotEmpty() {
      return this.geneSelected !== "";
    },
    removeGeneDetails() {
      this.$store.dispatch("changeGeneSelected", "");
    },
    setCellSelected(cellName) {
      this.$store.dispatch("changeCellSelected", cellName);
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
      for (const [key, value] of Object.entries(this.loadedDictData)) {
        (function(outerKey, outerValue) {
          for (const [key, value] of Object.entries(outerValue)) {
            if (key === globalThis.geneSelected) {
              globalThis.filteredGeneCellList.push([outerKey, value]);
            }
          }
        })(key, value);
      }
    }
  }
};
</script>

<style scoped>
</style>