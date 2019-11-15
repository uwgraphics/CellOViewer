<template>
  <v-layout row wrap align-center>
    <v-flex md12>
      <v-card
        max-height="1300"
        :style="{
          background:
            $vuetify.theme.themes[this.$store.getters.getCurrentThemeMode]
              .background
        }"
      >
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
            <v-flex md12 sm12>
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

              <v-layout row wrap>
                <v-flex
                  md6
                  sm6
                  v-if="cellSelectedExist && geneDataExist(cellSelected[0])"
                >
                  <h3 class="sub-title">{{ cellSelected[0] }}</h3>
                  <v-list class="list">
                    <v-list-item
                      :color="setOverlapGeneBackgroundColor(index, value, 0)"
                      input-value="true"
                      v-for="(value, index) in filteredData[0]"
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
                        <v-flex md5 sm5>
                          <span class="index"
                            >{{ loadedGeneIdToNameDict[value[2]] }}:</span
                          >
                        </v-flex>
                        <v-flex md7 sm7>
                          <span>
                            <v-tooltip top>
                              <template v-slot:activator="{ on }">
                                <v-progress-linear
                                  :value="
                                    setGeneIndexBarChartRatio(
                                      `${index}`,
                                      value,
                                      0
                                    )
                                  "
                                  :color="
                                    setGeneIndexBarChartColor(
                                      `${index}`,
                                      value,
                                      0
                                    )
                                  "
                                  :key="index"
                                  height="15"
                                  v-on="on"
                                  rounded
                                  striped
                                  reactive
                                >
                                  <template v-slot="{ value }">
                                    {{
                                      (
                                        (value / 100) *
                                        maxGeneMagnitude
                                      ).toFixed(fixedGeneDigits)
                                    }}
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
                      :color="setOverlapGeneBackgroundColor(index, value, 1)"
                      input-value="true"
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
                          <span class="index"
                            >{{ loadedGeneIdToNameDict[value[2]] }}:</span
                          >
                        </v-flex>
                        <v-flex md7 sm12>
                          <span>
                            <v-tooltip top>
                              <template v-slot:activator="{ on }">
                                <v-progress-linear
                                  :value="
                                    setGeneIndexBarChartRatio(`${index}`, 1)
                                  "
                                  :color="
                                    setGeneIndexBarChartColor(`${index}`, 1)
                                  "
                                  height="15"
                                  v-on="on"
                                  rounded
                                  striped
                                >
                                  <template v-slot="{ value }">
                                    {{
                                      (
                                        (value / 100) *
                                        maxGeneMagnitude
                                      ).toFixed(fixedGeneDigits)
                                    }}
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
import { COLOR_RAMP } from "../config";
import _ from "lodash";

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
      maxGeneMagnitude: 0.14907,
      loadedGeneData: {},
      loadedGeneIdToNameDict: {},
      sortOptions: ["default", "magnitude", "coordinated"],
      geneNameOnHover: "",
      geneCellCopy1: [],
      geneCellCopy2: [],
      topGenesInColumnOne: [],
      topGenesInColumnTwo: []
    };
  },
  methods: {
    sortBasedOnOption(option) {
      if (this.$store.getters.getCellDetails.length == 0) {
        return;
      }

      let globalThis = this;

      switch (option) {
        case "magnitude":
          globalThis.filteredData[0] = _.sortBy(
            globalThis.filteredData[0],
            [
              function(geneData) {
                console.log(geneData[1]);
                return gene[1];
              }
            ],
            ["asc"]
          );
          if (filteredData.length > 1) {
            globalThis.filteredData[1] = _.sortBy(
              globalThis.filteredData[1],
              [
                function(geneData) {
                  return gene[1];
                }
              ],
              ["asc"]
            );
          }
          return globalThis.filteredData;
        case "coordinated":
          // To be filled
      }
    },

    async fetchData() {
      this.loadedGeneData = await d3.json("./top_abs_10_dict.json");
      this.loadedGeneIdToNameDict = await d3.json("./gene_id_to_name.json");
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
    setGeneIndexBarChartColor(index, columnIndex) {
      let globalThis = this;
      let indexGeneValue = 0;
      if (columnIndex == 0) {
        indexGeneValue = globalThis.topGenesInColumnOne[index];
      } else if (columnIndex == 1) {
        indexGeneValue = globalThis.topGenesInColumnTwo[index];
      }

      if (indexGeneValue >= 0) {
        return "primary";
      } else {
        return "pink";
      }
    },

    setGeneIndexBarChartRatio(index, columnIndex) {
      let globalThis = this;
      if (columnIndex == 0) {
        return Math.abs(
          (
            (globalThis.topGenesInColumnOne[index] /
              globalThis.maxGeneMagnitude) *
            100
          ).toFixed(globalThis.fixedGeneDigits)
        );
      } else {
        return Math.abs(
          (
            (globalThis.topGenesInColumnTwo[index] /
              globalThis.maxGeneMagnitude) *
            100
          ).toFixed(globalThis.fixedGeneDigits)
        );
      }
    },

    setOverlapGeneBackgroundColor(index, value, columnIndex) {
      let globalThis = this;
      let cellName = value[2];

      if (columnIndex == 0) {
        let filteredDataSecondRow = globalThis.filteredData[1];
        if (globalThis.filteredData.length > 1) {
          for (const entry of Object.entries(filteredDataSecondRow)) {
            let geneValueObject = entry[1];
            if (geneValueObject[2] === cellName) {
              return COLOR_RAMP[index];
            }
          }
        }
      } else if (columnIndex == 1) {
        let filteredDataFirstRow = globalThis.filteredData[0];
        for (const entry of Object.entries(filteredDataFirstRow)) {
          let geneValueObject = entry[1];
          if (geneValueObject[2] === cellName) {
            let geneIndexInFirstRow = entry[0];
            return COLOR_RAMP[geneIndexInFirstRow];
          }
        }
      }

      return "#303030";
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

    cellSelectedExist() {
      return this.$store.getters.getCellSelected.length !== 0;
    },

    clearGeneNameOnHover() {
      this.geneNameOnHover = "";
    },

    geneDataExist(cellTypeName) {
      if (this.loadedGeneData[cellTypeName] === undefined) {
        return false;
      }
      return true;
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
            // Map the gene id to name before converting to lower case for search matching
            let lowerCaseElement = globalThis.loadedGeneIdToNameDict[
              element[2]
            ].toLowerCase();

            if (lowerCaseElement.includes(globalThis.search.toLowerCase())) {
              cell2FilteredArray.push(element);
            }
          });
        }
        if (cellTypes.length > 0) {
          cellTypes[0].forEach(element => {
            // Map the gene id to name before converting to lower case for search matching
            let lowerCaseElement = globalThis.loadedGeneIdToNameDict[
              element[2]
            ].toLowerCase();
            if (lowerCaseElement.includes(globalThis.search.toLowerCase())) {
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
      let cellArr = this.$store.getters.getCellSelected;
      this.$store.dispatch("changeCellDetails", []);
      this.topGenesInColumnOne = [];
      this.topGenesInColumnTwo = [];

      if (cellArr.length === 0) {
        return;
      }
      this.geneCellCopy1 = this.loadedGeneData[cellArr[0]];
      this.$store.dispatch("addToCellDetails", this.geneCellCopy1);
      let geneDataColumnOne = [];
      for (const geneData of this.geneCellCopy1) {
        geneDataColumnOne.push(Number(geneData[1]));
      }

      this.topGenesInColumnOne = geneDataColumnOne;

      if (cellArr.length > 1) {
        this.geneCellCopy2 = this.loadedGeneData[cellArr[1]];
        this.$store.dispatch("addToCellDetails", this.geneCellCopy2);
        let geneDataColumnTwo = [];
        for (const geneData of this.geneCellCopy2) {
          geneDataColumnTwo.push(Number(geneData[1]));
        }
        this.topGenesInColumnTwo = geneDataColumnTwo;
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
