<template>
  <v-layout row wrap align-center>
    <v-flex md12>
      <v-card max-height="1300">
        <v-card-title class="justify-center">
          <h2 class="title">Cell Details View</h2>
          <v-spacer></v-spacer>
          <v-btn medium color="red" justify-right dark @click="removeCellSelected">
            <v-icon dark>remove_circle</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-layout row>
            <v-flex md12 sm12 v-if="cellSelectedExist">
              <v-select
                v-if="geneDataExist(cellSelected[0])"
                v-model="cellDetailsOption"
                :items="sortOptions"
                @input="sortBasedOnOption"
                label="sort"
              ></v-select>
              <v-layout row wrap v-if="geneDataExist(cellSelected[0])">
                <v-flex md6 sm6>
                  <h3 class="sub-title">{{ cellSelected[0] }}</h3>
                  <v-list class="list">
                    <v-list-item
                      v-for="(value, index) in dynamicData[0]"
                      :key="index"
                      dense
                      @click="setGeneItem(value)"
                    >
                      <span>
                        <span class="index">{{ value[2] }}:</span>
                        {{ value[1] }}
                      </span>
                    </v-list-item>
                  </v-list>
                </v-flex>
                <v-flex md6 sm6 v-if="cellSelected.length == 2 && geneDataExist(cellSelected[1])">
                  <h3 class="sub-title">{{ cellSelected[1] }}</h3>
                  <v-list class="list">
                    <v-list-item
                      v-for="(value, index) in dynamicData[1]"
                      :key="index"
                      dense
                      @click="setGeneItem(value)"
                    >
                      <span>
                        <span class="index">{{ value[2] }}:</span>
                        {{ value[1] }}
                      </span>
                    </v-list-item>
                  </v-list>
                </v-flex>
              </v-layout>
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
      geneCellCopy1: [], // Could be removed, solely based on vuex
      geneCellCopy2: [], // Could be removed, solely based on vuex
      loadedGeneData: {},
      sortOptions: ["default", "strength", "magnitude"]
    };
  },
  methods: {
    sortBasedOnOption(cellDetailsOption) {
      this.$store.dispatch(
        "changeCellDetailsOption",
        String(cellDetailsOption)
      );
      switch (cellDetailsOption) {
        case "strength":
          return;
        case "magnitude":
          this.$store.dispatch("changeCellDetails", []);
          this.geneCellCopy1 = this.geneCellCopy1.sort((a, b) => {
            a[1] < b[1] ? 1 : -1;
          });
          this.$store.dispatch("addToCellDetails", this.geneCellCopy1);
          if (this.geneCellCopy2.length != 0) {
            this.geneCellCopy2 = this.geneCellCopy2.sort((a, b) => {
              a[1] < b[1] ? 1 : -1;
            });
            this.$store.dispatch("addToCellDetails", this.geneCellCopy2);
          }
          // this.listLocalCopy = this.listLocalCopy.sort((a, b) =>
          //   a[1].length < b[1].length ? 1 : -1
          // );
          return;
      }
    },
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
    setGeneItem(value) {
      this.$store.dispatch("changeGeneSelected", value[2]);
    }
  },
  computed: {
    cellSelected: {
      get() {
        return this.$store.getters.getCellSelected;
      }
    },
    cellDetailsOption: {
      get() {
        return this.$store.getters.getCellDetailsOption;
      },
      set(option) {
        this.$store.dispatch("changeCellDetailsOption", option);
      }
    },
    dynamicData() {
      if (this.geneCellCopy1.length == 0) {
        return;
      } else {
        return this.$store.getters.getCellDetails;
      }
    }
  },
  watch: {
    cellSelected() {
      let cellArr = this.$store.getters.getCellSelected;
      this.$store.dispatch("changeCellDetails", []);

      if (cellArr.length === 0) {
        return;
      }
      this.geneCellCopy1 = this.loadedGeneData[cellArr[0]];
      this.$store.dispatch("addToCellDetails", this.geneCellCopy1);
      if (cellArr.length > 1) {
        this.geneCellCopy2 = this.loadedGeneData[cellArr[1]];
        this.$store.dispatch("addToCellDetails", this.geneCellCopy2);
      }
    }
  }
};
</script>

<style scoped>
.message {
  color: red;
  text-align: left;
}
.geneName {
  color: #c5050c;
}
</style>