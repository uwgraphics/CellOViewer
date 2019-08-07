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
          <h3 class="sub-title">Gene: {{ geneSelected }}</h3>
          <v-layout row wrap id="list" :class="{ 'max-height': listHeight }">
            <v-flex md12 v-if="geneNotEmpty()">
              <v-list>
                <v-list-item v-for="(topGenes, index) in loadedDictData" :key="index">
                  <v-layout v-if="topGeneDataExist(topGenes, index)==true">
                    <v-flex md12>
                      <v-list-item @click="setDetailItem(index)">
                        <span class="index">{{ index }}:&nbsp;</span>
                        <span>{{ loadedDictData[index][geneSelected] }}</span>
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
      cardHeight: this.$store.getters.getCardHeight,
      cellTypeNames: [],
      listHeight: "400px",
      loadedDictData: {}
    };
  },
  methods: {
    setDetailItem(index) {
      console.log("OK", index);
    },
    async fetchData() {
      let data = await d3.json("./top_abs_10_dict.json");
      this.loadedDictData = Object.assign({}, data);
      console.log(this.loadedDictData);
      for (const [key, value] of Object.entries(this.loadedDictData)) {
        console.log(key, value);
        for (const [key, value] of Object.entries(value)) {
          console.log(key, value);
        }
      }
      // this.cellTypeNames = Object.keys(this.loadedDictData);
      // console.log(this.cellTypeNames);
    },
    geneNotEmpty() {
      return this.geneSelected !== "";
    },
    removeGeneDetails() {
      this.$store.dispatch("changeGeneSelected", "");
    },
    topGeneDataExist(topGenes, cellTypeName) {
      console.log(cellTypeName);
      console.log(
        typeof this.loadedDictData[cellTypeName][this.geneSelected] !==
          "undefined"
      );
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
  watch: {}
};
</script>

<style scoped>
</style>