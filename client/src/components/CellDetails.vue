<template>
  <v-layout row wrap align-center>
    <v-flex md12>
      <v-card max-height="550">
        <v-card-title class="justify-center">
          <h2 class="title">Cell Details View</h2>
          <v-spacer></v-spacer>
          <v-btn medium color="red" justify-right dark @click="removeCellSelected">
            <v-icon dark>remove_circle</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex md12 sm12 v-if="cellSelectedExist">
              <v-layout row wrap>
                <v-flex md6 sm6 v-if="geneDataExist(cellSelected[0])">
                  <h3 class="sub-title">{{ cellSelected[0] }}</h3>
                  <v-list class="list">
                    <v-list-item
                      v-for="(value, index) in loadedGeneData[cellSelected[0]]"
                      :key="index"
                      dense
                      @click="setGeneItem(index)"
                    >
                      <span
                        v-if="index===(loadedGeneData[cellSelected[0]].length - 1)"
                      >{{ index }}: {{value}}</span>
                      <span v-else>{{ index }}: {{value}},</span>
                    </v-list-item>
                  </v-list>
                </v-flex>
                <v-flex md6 sm6 v-if="cellSelected.length == 2 && geneDataExist(cellSelected[1])">
                  <h3 class="sub-title">{{ cellSelected[1] }}</h3>
                  <v-list class="list">
                    <v-list-item
                      v-for="(value, index) in loadedGeneData[cellSelected[1]]"
                      :key="index"
                      dense
                      @click="setGeneItem(index)"
                    >
                      <span
                        v-if="index===(loadedGeneData[cellSelected[1]].length - 1)"
                      >{{ index }}: {{value}}</span>
                      <span v-else>{{ index }}: {{value}},</span>
                    </v-list-item>
                  </v-list>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex md12 sm12 v-else>
              <p class="message">There are no top 10 gene data related to the selected cell type.</p>
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
      cardHighlight: false,
      loadedGeneData: {}
    };
  },
  methods: {
    // Load gene data in this component to avoid latency in the main component
    cellSelectedExist() {
      return this.$store.getters.getCellSelected.length !== 0;
    },
    async fetchData() {
      let data = await d3.json("./top_abs_10_dict.json");
      this.loadedGeneData = Object.assign({}, data);
    },
    geneDataExist(cellTypeName) {
      if (this.loadedGeneData[cellTypeName] === undefined) {
        return false;
      }

      return true;
    },
    removeCellSelected() {
      this.$store.dispatch("popFromCellSelected");
    },
    setGeneItem(index) {
      this.$store.dispatch("changeGeneSelected", index);
    }
  },
  computed: {
    cellSelected: {
      get() {
        return this.$store.getters.getCellSelected;
      }
    }
  },
  watch: {}
};
</script>

<style scoped>
.message {
  color: red;
  text-align: left;
}
</style>