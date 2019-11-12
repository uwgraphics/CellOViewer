<template>
  <v-layout row wrap align-center>
    <v-flex md12>
      <v-card max-height="1300">
        <v-card-title class="justify-center">
          <h4 class="view-title">Cell Details View</h4>
          <v-spacer></v-spacer>
          <v-btn
            medium
            color="red"
            justify-right
            dark
            @click="removeCellSelected"
          >
            <v-icon dark>remove_circle</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-layout row>
            <v-flex
              md12
              sm12
              v-if="cellSelectedExist && geneDataExist(cellSelected[0])"
            >
              <v-layout>
                <!-- Search Box -->
                <v-flex md9 sm12>
                  <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="search"
                    single-line
                    hide-details
                    hide-no-data
                  ></v-text-field>
                </v-flex>

                <v-spacer />

                <!-- Sort Box -->
                <v-flex md3 sm12>
                  <v-select
                    v-model="option"
                    :items="sortOptions"
                    @input="sortBasedOnOption"
                    label="sort"
                  ></v-select>
                </v-flex>
              </v-layout>

              <v-layout row wrap v-if="geneDataExist(cellSelected[0])">
                <v-flex md6 sm6>
                  <h3 class="sub-title">{{ cellSelected[0] }}</h3>
                  <v-list class="list">
                    <v-list-item
                      v-for="(value, index) in filteredData[0]"
                      :key="index"
                      dense
                      @click="setGeneItem(value)"
                      @mouseover="setGeneNameOnHover(value)"
                      @mouseleave="clearGeneNameOnHover()"
                      :class="[
                        value[2] === geneNameOnHover ? 'highlight-theme' : ''
                      ]"
                    >
                      <v-layout>
                        <v-flex md5 sm5>
                          <span class="index">{{ value[2] }}:</span>
                        </v-flex>
                        <v-flex md7 sm7>
                          <span>
                            <v-tooltip top>
                              <template v-slot:activator="{ on }">
                                <v-progress-linear
                                  :value="getGeneIndexValue(`${index}`, 0)"
                                  height="15"
                                  :color="getGeneIndexColorValue(`${index}`, 0)"
                                  v-on="on"
                                  rounded
                                  striped
                                  reactive
                                >
                                  <template v-slot="{ value }">
                                    {{ (value / 1000).toFixed(5) }}
                                  </template></v-progress-linear
                                >
                              </template>
                              <span>{{ value[1] }}</span>
                            </v-tooltip>
                          </span>
                        </v-flex>
                      </v-layout>
                    </v-list-item>
                  </v-list>
                </v-flex>
                <v-flex
                  md6
                  sm6
                  v-if="
                    cellSelected.length == 2 && geneDataExist(cellSelected[1])
                  "
                >
                  <h3 class="sub-title">{{ cellSelected[1] }}</h3>
                  <v-list class="list">
                    <v-list-item
                      v-for="(value, index) in filteredData[1]"
                      :key="index"
                      dense
                      @click="setGeneItem(value)"
                      @mouseover="setGeneNameOnHover(index, value)"
                      @mouseleave="clearGeneNameOnHover()"
                      :class="[
                        value[2] === geneNameOnHover ? 'highlight-theme' : ''
                      ]"
                    >
                      <v-layout>
                        <v-flex md5 sm12>
                          <span class="index">{{ value[2] }}:</span>
                        </v-flex>
                        <v-flex md7 sm12>
                          <span>
                            <v-tooltip top>
                              <template v-slot:activator="{ on }">
                                <v-progress-linear
                                  :value="getGeneIndexValue(`${index}`, 1)"
                                  height="15"
                                  v-on="on"
                                  rounded
                                  striped
                                >
                                  <template v-slot="{ value }">
                                    {{ (value / 1000).toFixed(5) }}
                                  </template>
                                </v-progress-linear>
                              </template>
                              <span>{{ value[1] }}</span>
                            </v-tooltip>
                          </span>
                        </v-flex>
                      </v-layout>
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
      fixedGeneDigits: 5,
      loadedGeneData: {},
      sortOptions: ["default", "magnitude"],
      geneNameOnHover: "",

      columnOneIndex0: 0,
      columnOneIndex1: 0,
      columnOneIndex2: 0,
      columnOneIndex3: 0,
      columnOneIndex4: 0,
      columnOneIndex5: 0,
      columnOneIndex6: 0,
      columnOneIndex7: 0,
      columnOneIndex8: 0,
      columnOneIndex9: 0,

      columnTwoIndex0: 0,
      columnTwoIndex1: 0,
      columnTwoIndex2: 0,
      columnTwoIndex3: 0,
      columnTwoIndex4: 0,
      columnTwoIndex5: 0,
      columnTwoIndex6: 0,
      columnTwoIndex7: 0,
      columnTwoIndex8: 0,
      columnTwoIndex9: 0
    };
  },
  methods: {
    sortBasedOnOption(option) {
      if (this.$store.getters.getCellDetails.length == 0) {
        return;
      }

      switch (option) {
        case "magnitude":
          this.geneCellCopy1 = this.geneCellCopy1.sort((a, b) => {
            Math.abs(a[1]) < Math.abs(b[1]) ? 1 : -1;
          });
      }
    },
    // Load gene data in this component to avoid latency in the main component
    cellSelectedExist() {
      return this.$store.getters.getCellSelected.length !== 0;
    },

    async fetchData() {
      let data = await d3.json("./top_abs_10_dict.json");
      for (const cellType of Object.values(data)) {
        for (const gene of cellType) {
          gene[1] = gene[1].toFixed(this.fixedGeneDigits);
        }
      }
      this.loadedGeneData = data;
    },

    geneDataExist(cellTypeName) {
      if (this.loadedGeneData[cellTypeName] === undefined) {
        return false;
      }
      return true;
    },

    getDefaultCells() {
      let cellArr = this.$store.getters.getCellSelected;
      let geneCellCopy = [];
      geneCellCopy.push(this.loadedGeneData[cellArr[0]]);
      if (cellArr.length > 1) {
        geneCellCopy.push(this.loadedGeneData[cellArr[1]]);
      }

      return geneCellCopy;
    },

    /**
     * Get gene color by column and gene index, if negative display pink
     */
    getGeneIndexColorValue(index, columnIndex) {
      let indexGeneValue = "";
      if (columnIndex == 0) {
        indexGeneValue = `columnOneIndex` + index;
      } else if (columnIndex == 1) {
        indexGeneValue = `columnTwoIndex` + index;
      }

      if (this[indexGeneValue] >= 0) {
        return "primary";
      } else {
        return "pink lighten-1";
      }
    },

    getGeneIndexValue(index, columnIndex) {
      let indexGeneValue = "";
      if (columnIndex == 0) {
        indexGeneValue = `columnOneIndex` + index;
      } else if (columnIndex == 1) {
        indexGeneValue = `columnTwoIndex` + index;
      }
      return Math.abs(this[indexGeneValue]);
    },

    sortCells() {
      let cellArr = this.$store.getters.getCellSelected;
      let geneCellCopy = [];
      geneCellCopy.push(
        this.loadedGeneData[cellArr[0]]
          .concat()
          .sort((a, b) => (a[1] < b[1] ? 1 : -1))
      );
      if (cellArr.length > 1) {
        geneCellCopy.push(
          this.loadedGeneData[cellArr[1]]
            .concat()
            .sort((a, b) => (a[1] < b[1] ? 1 : -1))
        );
      }
      return geneCellCopy;
    },

    removeCellSelected() {
      this.$store.dispatch("popFromCellSelected");
    },

    setGeneItem(value) {
      this.$store.dispatch("changeGeneSelected", value[2]);
    },

    setGeneNameOnHover(index, value) {
      this.geneNameOnHover = value[2];
    },

    clearGeneNameOnHover() {
      this.geneNameOnHover = "";
    }
  },
  computed: {
    cellSelected: {
      get() {
        return this.$store.getters.getCellSelected;
      }
    },

    currentCells() {
      return this.$store.getters.getOption === "default"
        ? this.getDefaultCells()
        : this.sortCells();
    },

    dynamicData() {
      if (this.geneCellCopy1.length == 0) {
        return;
      } else {
        return this.$store.getters.getCellDetails;
      }
    },

    filteredData() {
      let globalThis = this;
      if (this.$store.getters.getGeneSearch === "") {
        return this.currentCells;
      } else {
        let resultArr = [];
        let cellTypes = this.currentCells;
        let cell1FilteredArray = [];
        let cell2FilteredArray = [];
        if (cellTypes.length > 1) {
          cellTypes[1].forEach(element => {
            if (element[2].includes(globalThis.search)) {
              cell2FilteredArray.push(element);
            }
          });
        }
        if (cellTypes.length > 0) {
          cellTypes[0].forEach(element => {
            if (element[2].includes(globalThis.search)) {
              cell1FilteredArray.push(element);
            }
          });
        }
        resultArr.push(cell1FilteredArray);
        resultArr.push(cell2FilteredArray);

        return resultArr;
      }
    },

    option: {
      get() {
        return this.$store.getters.getOption;
      },
      set(option) {
        this.$store.dispatch("changeOption", option);
      }
    },

    search: {
      get() {
        return this.$store.getters.getGeneSearch;
      },
      set(input) {
        this.$store.dispatch("changeGeneSearch", input);
      }
    },

    selectedTheme() {
      return this.onHover === true ? "highlight-theme" : "";
    }
  },
  watch: {
    cellSelected() {
      let globalThis = this;

      let cellArr = this.$store.getters.getCellSelected;
      this.$store.dispatch("changeCellDetails", []);

      if (cellArr.length === 0) {
        return;
      }
      this.geneCellCopy1 = this.loadedGeneData[cellArr[0]];
      this.$store.dispatch("addToCellDetails", this.geneCellCopy1);
      /* Update Column One Index value to offer dynamic rendering */
      let indexCounter = 0;
      for (const geneData of this.geneCellCopy1) {
        let indexValueToChange = `columnOneIndex${indexCounter}`;
        globalThis[indexValueToChange] = (geneData[1] * 1000).toFixed(5);
        indexCounter++;
      }

      if (cellArr.length > 1) {
        this.geneCellCopy2 = this.loadedGeneData[cellArr[1]];
        this.$store.dispatch("addToCellDetails", this.geneCellCopy2);

        let indexCounter2 = 0;
        for (const geneData of this.geneCellCopy2) {
          let indexValueToChange2 = `columnTwoIndex${indexCounter2}`;
          globalThis[indexValueToChange2] = (geneData[1] * 1000).toFixed(5);
          indexCounter2++;
        }
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
.highlight-theme {
  background: #34495e;
}
</style>
