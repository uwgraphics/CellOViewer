<template>
  <v-layout row wrap align-center>
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
          <h4 class="view-title">Gene Details View</h4>
          <v-tooltip right max-width="250px">
            <template v-slot:activator="{ on, attrs }">
              <img src="https://raw.githubusercontent.com/uwgraphics/CellOViewer/master/client/static/question.svg" v-bind="attrs" v-on="on" width="22" height="22" style="margin: 4px"/>
            </template>
            <span>This view displays cell types that can be discriminated by the currently selected gene.</span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <v-btn
            medium
            color="red"
            justify-right
            dark
            @click="removeGeneDetails"
          >
            <v-icon dark>remove_circle</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex md9 sm12 v-if="geneNotEmpty()">
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
            <v-flex md3 sm12 v-if="geneNotEmpty()">
              <v-select
                v-model="option"
                :items="sortOptions"
                @input="sortBasedOnOption"
                label="sort"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex v-if="geneNotEmpty()">
              <h3 class="sub-title">Gene: {{ geneSelectedPresentedName }}</h3>
              <div class="gene-description">{{ geneSelectedDescription }}</div>
              <v-list
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
                  @click="setCellSelected(value[0])"
                >
                  <v-layout>
                    <v-flex md3 offset-md1 class="index"
                      >{{ value[0] }}:&nbsp;</v-flex
                    >
                    <v-flex md6 offset-md1>
                      <span>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-progress-linear
                              :value="setGeneIndexBarChartRatio(value, 0)"
                              :color="setGeneIndexBarChartColor(value, 1)"
                              height="15"
                              v-on="on"
                              rounded
                              striped
                              reactive
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
    // Fetch gene data once mounted
    this.fetchData();
  },
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
      this.$store.dispatch("changeGeneSelected", "");
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
    setCellSelected(cellName) {
      let curList = this.$store.getters.getCellSelected;
      if (curList.length > 1) {
        curList.pop();
      }
      curList.push(cellName);
      this.$store.dispatch("changeCellSelected", curList);
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
  },
  computed: {
    filteredGeneCellList() {
      return this.$store.getters.getGeneSearchOption === "default"
        ? this.returnToDefaultList()
        : this.sortBasedOnOption(this.$store.getters.getGeneSearchOption);
    },
    geneSelected: {
      get() {
        return this.$store.getters.getGeneSelected;
      },
      set(option) {
        this.$store.dispatch("changeGeneSelected", option);
      }
    },
    option: {
      get() {
        return this.$store.getters.getGeneSearchOption;
      },
      set(option) {
        this.$store.dispatch("changeGeneSearchOption", option);
      }
    },
    search: {
      get() {
        return this.$store.getters.getCellInGeneSearch;
      },
      set(input) {
        this.$store.dispatch("changeCellInGeneSearch", input);
      }
    }
  },
  watch: {
    geneSelected() {
      // Change sorting back to default
      this.$store.dispatch("changeGeneSearchOption", "default");
      let globalThis = this;
      // Clear both local list and store to receive updated values
      globalThis.filteredList = [];
      this.$store.dispatch("changeTopGeneCellList", []);
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
            globalThis.$store.dispatch("addToTopGeneCellList", [
              cellName,
              geneValue
            ]);
          }
        }
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
  max-height: 355px;
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
  margin-top: 10px;
  color: "#fff";
}
</style>
