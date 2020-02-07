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
        <v-card-title>
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

              <!-- Cell Type Top Gene list -->
              <v-layout row wrap>
                <v-flex
                  md6
                  sm6
                  v-if="cellSelectedExist && geneDataExist(cellSelected[0])"
                >
                  <h3 class="sub-title">{{ cellSelected[0] }}</h3>
                  <v-list
                    class="list"
                    :style="{
                      background:
                        $vuetify.theme.themes[
                          this.$store.getters.getCurrentThemeMode
                        ].background
                    }"
                  >
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
                                      `${value}`
                                    )
                                  "
                                  :color="
                                    setGeneIndexBarChartColor(
                                      `${index}`,
                                      `${value}`
                                    )
                                  "
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
                  <v-list
                    class="list"
                    :style="{
                      background:
                        $vuetify.theme.themes[
                          this.$store.getters.getCurrentThemeMode
                        ].background
                    }"
                  >
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
                                    setGeneIndexBarChartRatio(
                                      `${index}`,
                                      `${value}`
                                    )
                                  "
                                  :color="
                                    setGeneIndexBarChartColor(
                                      `${index}`,
                                      `${value}`
                                    )
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
import _ from "lodash";
import { COLOR_RAMP } from "../config";

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
      geneNameOnHover: ""
    };
  },
  methods: {
    sortBasedOnOption(option) {
      let globalThis = this;
      console.log(this.filteredData[0]);
      switch (option) {
        case "default":
          this.filteredData[0] = this.loadedGeneData[cellArr[0]];
          if (this.filteredData.length > 1) {
            this.filteredData[1] = this.loadedGeneData[cellArr[0]];
          }
          return;
        case "magnitude":
          _.sortBy(globalThis.filteredData[0], (o) => o[1], ['desc'])
          _.sortBy(globalThis.filteredData[1], (o) => o[1], ['desc'])
          return;
        case "coordinated":
          if (globalThis.filteredData.length <= 1) {
            return;
          }
          let itr = 0;
          // Dict saves cell type name - index pair
          let cellTypeNameIndexDict = [];
          for (let i = 0; i < globalThis.filteredData[0].length; i++) {
            let cellTypeName = globalThis.filteredData[0][i][2];
            cellTypeNameIndexDict[cellTypeName] = i;
          }
          for (let j = 0; j < globalThis.filteredData[1].length; j++) {
            let cellTypeNameInColumnTwo = globalThis.filteredData[1][j][2];

            if (cellTypeNameInColumnTwo in cellTypeNameIndexDict) {
              let overlapCellTypeIndex =
                cellTypeNameIndexDict[cellTypeNameInColumnTwo];
              this.swapEntryPositions(
                globalThis.filteredData[0],
                overlapCellTypeIndex,
                itr
              );
              this.swapEntryPositions(globalThis.filteredData[1], j, itr);
              itr++;
            }
          }

          return;
      }
    },
    swapEntryPositions(list, indexA, indexB) {
      let temp = list[indexA];
      list[indexA] = list[indexB];
      list[indexB] = temp;
    },
    async fetchData() {
      this.loadedGeneData = await d3.json("./top_abs_10_dict.json");
      this.loadedGeneIdToNameDict = await d3.json("./gene_id_to_name.json");
    },
    getDefaultCellTypes() {
      let cellArr = this.$store.getters.getCellSelected;
      let geneCellCopy = [];
      console.log(this.loadedGeneData[cellArr[0]]);
      geneCellCopy.push(this.loadedGeneData[cellArr[0]]);
      if (cellArr.length > 1) {
        geneCellCopy.push(this.loadedGeneData[cellArr[1]]);
      }
      return geneCellCopy;
    },
    /**
     * Get gene color by column and gene index, if negative display pink
     */
    setGeneIndexBarChartColor(index, value) {
      let indexGeneValue = parseFloat(value.split(",")[1]);

      if (indexGeneValue >= 0) {
        return "primary";
      } else {
        return "pink";
      }
    },
    setGeneIndexBarChartRatio(index, value) {
      let globalThis = this;
      let numberValue = parseFloat(value.split(",")[1]);
      return Math.abs(
        ((numberValue / globalThis.maxGeneMagnitude) * 100).toFixed(
          globalThis.fixedGeneDigits
        )
      );
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
    currentCellTypes() {
      return this.$store.getters.getOption === "default"
        ? this.getDefaultCellTypes()
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
        return this.currentCellTypes;
      } else {
        let resultArr = [];
        let cellTypes = this.currentCellTypes;
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
      if (cellArr.length === 0) {
        return;
      }
      this.geneCellCopy1 = this.loadedGeneData[cellArr[0]];
      this.$store.dispatch("addToCellDetails", this.geneCellCopy1);

      let geneDataColumnOne = [];
      for (const geneData of this.geneCellCopy1) {
        geneDataColumnOne.push(Number(geneData[1]));
      }

      if (cellArr.length > 1) {
        this.geneCellCopy2 = this.loadedGeneData[cellArr[1]];
        this.$store.dispatch("addToCellDetails", this.geneCellCopy2);
        let geneDataColumnTwo = [];
        for (const geneData of this.geneCellCopy2) {
          geneDataColumnTwo.push(Number(geneData[1]));
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
