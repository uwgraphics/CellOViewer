<template>
  <v-layout row wrap align-center>
    <v-flex md12>
      <v-card :class="{ height:cardHeight }">
        <v-card-title class="justify-center">
          <h2 class="title">Cell Details View</h2>
        </v-card-title>
        <v-card-text>
          <v-btn class="ma-2" color="red" dark @click="removeDetailObject">
            Remove Cell Details
            <v-icon dark right>remove_circle</v-icon>
          </v-btn>
          <v-layout row wrap>
            <v-flex md12 sm12 v-if="Object.keys(detailObject).length !== 0">
              <h3 class="sub-title">{{ detailObject[0][1] }}</h3>
              <v-list v-if="geneDataExist(detailObject[0][1])" id="list">
                <v-list-item v-for="(value, index) in loadedGeneData[detailObject[0][1]]" :key="index" dense @click="setGeneItem(index)">
                  <span v-if="index===(loadedGeneData[detailObject[0][1]].length - 1)">{{ index }}: {{value}}</span>
                  <span v-else>{{ index }}: {{value}},</span>
                </v-list-item>
              </v-list>
              <p v-else class="message">There is no top 10 gene data related to this cell type.</p>
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
  name: "cell-details",
  props: [],
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      cardHeight: this.$store.getters.getCardHeight,
      detailObjectLocal: {},
      loadedGeneData: {}
    };
  },
  methods: {
    // Load gene data in this component to avoid latency in the main component
    async fetchData() {
      let data = await d3.json("./top_abs_10_dict.json");
      this.loadedGeneData = Object.assign({}, data);
      console.log(this.loadedGeneData);
      console.log(this.loadedGeneData["B cell"]);
    },
    geneDataExist(cellTypeName) {
      if (this.loadedGeneData[cellTypeName] === undefined) {
        return false;
      }

      return true;
    },
    removeDetailObject() {
      this.$store.dispatch("changeDetailObject", {});
    },
    setGeneItem(index) {
      this.$store.dispatch("changeGeneSelected", index);
    }
  },
  computed: {
    detailObject: {
      get() {
        return this.$store.getters.getDetailObject;
      }
    }
  },
  watch: {
    detailObject() {
      console.log(this.$store.getters.getDetailObject);
    }
  }
};
</script>

<style scoped>
#list {
  max-height: 400px;
  overflow-y: auto;
}
.message {
  color: red;
}
</style>