<template>
  <v-layout row wrap align-center>
    <v-flex md12>
      <v-card
        :max-height="cardHeight"
        :color="
          $vuetify.theme.themes[this.$store.getters.getCurrentThemeMode]
            .background
        "
      >
        <v-card-title class="justify-left">
          <h4 class="view-title">
            Search View
          </h4>
        </v-card-title>

        <v-tabs
          fixed-tabs
          :background-color="
            $vuetify.theme.themes[this.$store.getters.getCurrentThemeMode]
              .background
          "
        >
          <v-tab>Cell Type Centric</v-tab>
          <v-tab>Gene Centric</v-tab>

          <!-- Cell Centric Search View -->
          <v-tab-item>
            <CellTypeCentricSearchTab
              :cell-data="this.$store.getters.getCellTypeGraphStructureData"
            />
          </v-tab-item>

          <!-- Gene Centric Search View -->
          <v-tab-item>
            <v-card-text>
              <v-layout>
                <v-flex md12 sm12>
                  <v-text-field
                    v-model="geneSearchEntry"
                    append-icon="search"
                    label="search"
                    single-line
                    hide-details
                    hide-no-data
                  />
                </v-flex>
              </v-layout>

              <!-- Gene data -->
              <virtual-list :size="40" :remain="10" class="list">
                <v-list-item
                  v-for="item of filteredGeneData"
                  :key="item.id"
                  three-line
                  @click="setGeneItem(item)"
                >
                  <v-list-item-content class="list-item-box">
                    <v-list-item-title>
                      {{ loadedGeneIdToNameDict[item] }}:&nbsp;
                    </v-list-item-title>

                    <v-list-item-subtitle>
                      <a class="web-link" @click="navigateToGenePage(item)">
                        {{ item }}
                      </a>
                    </v-list-item-subtitle>

                    <v-list-item-subtitle>
                      {{ loadedGeneIdToDescriptionDict[item] }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </virtual-list>
            </v-card-text>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import CellTypeCentricSearchTab from "@/components/CellTypeCentricSearchTab";
import * as d3 from "d3";
import _ from "lodash";
import virtualList from "vue-virtual-scroll-list";

export default {
  name: "SearchView",

  components: {
    "virtual-list": virtualList,
    CellTypeCentricSearchTab
  },

  props: {
    cellData: {
      type: Object,
      default: function() {
        return { message: "cell data is here" };
      }
    }
  },

  data() {
    return {
      cardHeight: "600",
      listHeight: "500px",
      listLocalCopy: [],
      listSize: 2, // Put this in store at cleanup phase
      loaded: false,
      loadedDictData: {},
      loadedGeneData: [],
      loadedGeneIdToNameDict: {},
      loadedGeneIdToDescriptionDict: {},
      sortOptions: ["default", "alphabetical"]
    };
  },

  computed: {
    filteredCellTypeData() {
      if (this.$store.getters.getSearch === "") {
        return this.listLocalCopy;
      } else {
        let caseInsensitiveCellTypeSearchEntry = this.cellTypeSearchEntry.toLowerCase();

        return this.listLocalCopy.filter(cell => {
          let caseInsesitiveCell = cell[0].toLowerCase();

          return caseInsesitiveCell.includes(
            caseInsensitiveCellTypeSearchEntry
          );
        });
      }
    },

    /**
     * Filtered gene data for gene centric view
     */
    filteredGeneData() {
      let globalThis = this;

      if (this.$store.getters.getGeneSearchEntry === "") {
        return this.loadedGeneData;
      } else {
        return this.loadedGeneData.filter(gene => {
          if (globalThis.loadedGeneIdToNameDict[gene] == undefined) {
            return;
          }
          return globalThis.loadedGeneIdToNameDict[gene].includes(
            this.geneSearchEntry
          );
        });
      }
    },

    geneSelected: {
      get() {
        return this.$store.getters.getGeneSelected;
      }
    },

    geneSearchEntry: {
      get() {
        return this.$store.getters.getGeneSearchEntry;
      },
      set(input) {
        this.$store.dispatch("changeGeneSearchEntry", input);
      }
    }
  },

  watch: {
    cellData() {
      this.loaded = true;
      this.listLocalCopy = this.generateListCopy(this.cellData);
    },
    geneSelected() {
      let globalThis = this;
      this.$store.dispatch("changeCellTypesThatHaveSelectedGeneAsTopValue", []);
      for (const [key, value] of Object.entries(this.loadedDictData)) {
        let geneArr = value;
        for (let i = 0; i < geneArr.length; i++) {
          if (geneArr[i][2] === globalThis.geneSelected) {
            let cellName = key;
            let geneValue = value[i][1];
            globalThis.$store.dispatch(
              "addToCellTypesThatHaveSelectedGeneAsTopValue",
              [cellName, geneValue]
            );
          }
        }
      }
    }
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      this.loadedGeneData = await d3.json("./genes.json");
      this.loadedDictData = await d3.json("./top_abs_10_dict.json");
      this.loadedGeneIdToNameDict = await d3.json("./gene_id_to_name.json");
      this.loadedGeneIdToDescriptionDict = await d3.json(
        "gene_id_to_description.json"
      );
    },

    setSelectedCellTypeList(cellName) {
      let curList = this.$store.getters.getSelectedCellTypeList;
      while (curList.length >= this.listSize) {
        curList.pop();
      }
      curList.push(cellName);
      this.$store.dispatch("changeSelectedCellTypeList", curList);
    },

    generateListCopy(originalList) {
      return Object.entries(_.cloneDeep(originalList));
    },

    navigateToGenePage(item) {
      window.open(
        "http://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=" + item
      );
    },

    setGeneItem(gene) {
      this.$store.dispatch("changeSelectedGene", gene);
    }
  }
};
</script>

<style scoped>
.list-item-box {
  text-align: right;
}
.web-link {
  text-decoration: underline;
}
.cell-type-children {
  margin: 10px;
}
</style>
