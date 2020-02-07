<template>
  <v-layout
    row
    wrap
    align-center
  >
    <v-flex md12>
      <v-card
        max-height="595"
        :style="{
          background:
            $vuetify.theme.themes[this.$store.getters.getCurrentThemeMode]
              .background
        }"
      >
        <v-card-title class="justify-center">
          <h4 class="view-title">
            Gene Details View
          </h4>
          <v-spacer />
          <v-btn
            medium
            color="red"
            justify-right
            dark
            @click="removeGeneDetails"
          >
            <v-icon dark>
              remove_circle
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text v-if="geneNotEmpty()">
          <v-layout
            row
            wrap
          >
            <v-flex
              md9
              sm12
            >
              <v-text-field
                v-model="search"
                append-icon="search"
                label="search"
                single-line
                hide-details
                hide-no-data
              />
            </v-flex>
            <v-spacer />
            <v-flex
              v-if="geneNotEmpty()"
              md3
              sm12
            >
              <v-select
                v-model="option"
                :items="sortOptions"
                label="sort"
                @input="sortBasedOnOption"
              />
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex v-if="geneNotEmpty()">
              <h3 class="sub-title">
                Gene: {{ geneSelectedPresentedName }}
              </h3>
              <div class="gene-description">
                {{ geneSelectedDescription }}
              </div>

              <v-list
                v-if="filteredGeneCellList.length != 0"
                :class="{ 'max-height': listHeight }"
                class="list"
                :style="{
                  background:
                    $vuetify.theme.themes[
                      this.$store.getters.getCurrentThemeMode
                    ].background
                }"
              >
                <v-list-item
                  v-for="(value, index) in filteredGeneCellList"
                  :key="index"
                  @click="setSelectedCellTypeList(value[0])"
                >
                  <v-layout>
                    <v-flex
                      md3
                      offset-md1
                      class="index"
                    >
                      {{ value[0] }}:&nbsp;
                    </v-flex>

                    <v-flex
                      md6
                      offset-md1
                    >
                      <span>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-progress-linear
                              :value="setGeneIndexBarChartRatio(value, 0)"
                              :color="setGeneIndexBarChartColor(value, 1)"
                              height="15"
                              rounded
                              striped
                              reactive
                              v-on="on"
                            >
                              <template v-slot="{ value }">
                                {{
                                  ((value / 100) * maxGeneMagnitude).toFixed(
                                    fixedGeneDigits
                                  )
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
              
              <div v-else class="empty-prompt-message">
                No cell types include this gene as their top values.
              </div>
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
  name: "GeneDetailsView",

  props: [],
  
  data() {
    return {
      cellTypeNames: [],
      filteredList: [],
      fixedGeneDigits: 5,
      geneSelectedPresentedName: "",
      geneSelectedDescription: "",
      listHeight: "400px",
      loadedDictData: {},
      loadedGeneIdToNameDict: {},
      loadedGeneIdToDescriptionDict: {},
      maxGeneMagnitude: 0.14907,
      sortOptions: ["default", "strength", "magnitude", "cell type name"]
    };
  },

  computed: {
    filteredGeneCellList() {
      return this.$store.getters.getGeneSortOption === "default"
        ? this.returnToDefaultList()
        : this.sortBasedOnOption(this.$store.getters.getGeneSortOption);
    },

    geneSelected: {
      get() {
        return this.$store.getters.getSelectedGene;
      },
      set(option) {
        this.$store.dispatch("changeSelectedGene", option);
      }
    },

    option: {
      get() {
        return this.$store.getters.getGeneSortOption;
      },
      set(option) {
        this.$store.dispatch("changeGeneSortOption", option);
      }
    },

    search: {
      get() {
        return this.$store.getters.getCellTypeSearchEntryInGeneDetailsView;
      },
      set(input) {
        this.$store.dispatch("changeCellTypeSearchEntryInGeneDetailsView", input);
      }
    }
  },

  watch: {
    geneSelected() {
      // Change sorting back to default
      this.$store.dispatch("changeGeneSortOption", "default");
      let globalThis = this;
      // Clear both local list and store to receive updated values
      globalThis.filteredList = [];
      this.$store.dispatch("changeCellTypesThatHaveSelectedGeneAsTopValue", []);
      this.geneSelectedPresentedName = this.loadedGeneIdToNameDict[
        this.geneSelected
      ];
      this.geneSelectedDescription = this.loadedGeneIdToDescriptionDict[
        this.geneSelected
      ];

      for (const [key, value] of Object.entries(this.loadedDictData)) {
        let geneArr = value;
        for (let i = 0; i < geneArr.length; i++) {
          if (geneArr[i][2] === globalThis.geneSelected) {
            let cellName = key;
            let geneValue = value[i][1];
            globalThis.filteredList.push([cellName, geneValue]);
            globalThis.$store.dispatch("addToCellTypesThatHaveSelectedGeneAsTopValue", [
              cellName,
              geneValue
            ]);
          }
        }
      }
    }
  },
  mounted() {
    // Fetch gene data once mounted
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loadedDictData = await d3.json("./top_abs_10_dict.json");
      this.loadedGeneIdToNameDict = await d3.json("./gene_id_to_name.json");
      this.loadedGeneIdToDescriptionDict = await d3.json(
        "gene_id_to_description.json"
      );
    },

    filterBySearchList(list) {
      let globalThis = this;
      let filterBySearchList = [];
      list.forEach(element => {
        let lowerCaseElement = element[0].toLowerCase();
        if (lowerCaseElement.includes(globalThis.search.toLowerCase())) {
          filterBySearchList.push(element);
        }
      });
      return filterBySearchList;
    },

    geneNotEmpty() {
      return this.geneSelected !== "";
    },

    navigateToGenePage() {
      window.open(
        "http://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=" +
          this.geneSelected
      );
    },

    removeGeneDetails() {
      this.$store.dispatch("changeSelectedGene", "");
    },

    returnToDefaultList() {
      let list = [];
      let globalThis = this;
      for (const [key, value] of Object.entries(this.loadedDictData)) {
        let geneArr = value;
        for (let i = 0; i < geneArr.length; i++) {
          if (geneArr[i][2] === globalThis.geneSelected) {
            let cellName = key;
            let geneValue = value[i][1].toFixed(this.fixedGeneDigits);
            list.push([cellName, geneValue]);
          }
        }
      }

      return this.filterBySearchList(list);
    },

    setSelectedCellTypeList(cellName) {
      let curList = this.$store.getters.getSelectedCellTypeList;
      if (curList.length > 1) {
        curList.pop();
      }
      curList.push(cellName);
      this.$store.dispatch("changeSelectedCellTypeList", curList);
    },

    sortBasedOnOption(option) {
      switch (option) {
        case "default":
          return this.filterBySearchList(this.filteredList);
        case "strength":
          return this.filterBySearchList(
            this.filteredList.sort((a, b) =>
              Math.abs(a[1]) > Math.abs(b[1]) ? -1 : 1
            )
          );
        case "magnitude":
          return this.filterBySearchList(
            this.filteredList.sort((a, b) => (a[1] > b[1] ? -1 : 1))
          );
        case "cell type name":
          return this.filterBySearchList(
            this.filteredList.sort((a,b) => (a[0].toLowerCase() < b[0].toLowerCase() ? -1 : 1))
          )
      }
    },

    topGeneDataExist(topGenes) {
      return typeof topGenes[this.geneSelected] !== "undefined";
    },

    setGeneIndexBarChartRatio(geneValues, columnIndex) {
      let globalThis = this;
      let value = geneValues[1];
      if (columnIndex == 0) {
        return Math.abs(
          ((value / globalThis.maxGeneMagnitude) * 100).toFixed(
            globalThis.fixedGeneDigits
          )
        );
      }
    },

    setGeneIndexBarChartColor(geneValues) {
      let value = geneValues[1];
      if (value >= 0) {
        return "primary";
      } else {
        return "pink";
      }
    }
  }
};
</script>

<style scoped>
.list {
  max-height: 300px;
  overflow-y: auto;
}
.gene-web-link {
  text-align: left;
  margin-top: 10px;
  text-decoration: underline;
}
.gene-description {
  text-align: left;
  font-weight: normal;
  font-size: medium;
  margin: 10px;
  color: var(--v-primary-lighten1);
}
.empty-prompt-message {
  text-align: left;
  margin: 10px;
}
</style>
