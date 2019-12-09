<template>
  <v-layout row wrap align-center>
    <v-flex md12>
      <v-card
        max-height="600"
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
          <v-tab>Cell Centric</v-tab>
          <v-tab>Gene Centric</v-tab>
          <!-- Cell Centric -->
          <v-tab-item>
            <v-card-text
              :style="{
                background:
                  $vuetify.theme.themes[this.$store.getters.getCurrentThemeMode]
                    .background
              }"
            >
              <v-layout>
                <v-flex md9 sm12>
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
                <v-flex md3 sm12>
                  <v-select
                    v-model="option"
                    :items="sortOptions"
                    label="sort"
                    @input="sortBasedOnOption"
                  />
                </v-flex>
              </v-layout>
              <v-layout
                row
                wrap
                class="list"
                :class="{ 'max-height': listHeight }"
              >
                <v-flex v-if="loaded && listLocalCopy" md12>
                  <v-list
                    :style="{
                      background:
                        $vuetify.theme.themes[
                          this.$store.getters.getCurrentThemeMode
                        ].background
                    }"
                  >
                    <v-list-item
                      v-for="(keyValuePair, index) in filteredData"
                      :key="index"
                      @click="setSelectedCellTypeList(keyValuePair[0])"
                    >
                      <v-layout>
                        <!-- Cell Type Keyword -->
                        <v-flex
                          v-if="keyValuePair[0] != null"
                          md3
                          offset-md1
                          class="index"
                        >
                          {{ keyValuePair[0] }}:&nbsp;
                        </v-flex>

                        <!-- Case of No Children -->
                        <v-flex
                          v-if="keyValuePair[1].length == 0"
                          md6
                          offset-md1
                        >
                          <div class="fade values">No Direct Children</div>
                        </v-flex>

                        <!-- Case of Only One Children -->
                        <v-flex
                          v-else-if="keyValuePair[1].length == 1"
                          md6
                          offset-md1
                        >
                          <div class="values">{{ keyValuePair[1][0] }}</div>
                        </v-flex>

                        <!-- Case of More Than One Children -->
                        <v-flex v-else md6 offset-md1>
                          <v-expansion-panels class="values" @click.native.stop>
                            <v-expansion-panel color="primary">
                              <v-expansion-panel-header>
                                {{
                                  keyValuePair[1].length + " direct children"
                                }}
                              </v-expansion-panel-header>
                              <v-expansion-panel-content>
                                <v-list
                                  v-for="(neighbor, index) in keyValuePair[1]"
                                  :key="index"
                                  dense
                                >
                                  <v-list-item
                                    v-if="index == keyValuePair[1].length - 1"
                                    @click="setSelectedCellTypeList(neighbor)"
                                  >
                                    {{ neighbor }}
                                  </v-list-item>
                                  <div v-else>
                                    <v-list-item
                                      @click="setSelectedCellTypeList(neighbor)"
                                      >{{ neighbor }},</v-list-item
                                    >
                                  </div>
                                </v-list>
                              </v-expansion-panel-content>
                            </v-expansion-panel>
                          </v-expansion-panels>
                        </v-flex>
                      </v-layout>
                    </v-list-item>
                  </v-list>
                </v-flex>
              </v-layout>
            </v-card-text>
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
import * as d3 from "d3";
import virtualList from "vue-virtual-scroll-list";
import _ from "lodash";

export default {
  name: "CellList",

  components: {
    "virtual-list": virtualList
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
      cardHeight: this.$store.getters.getCardHeight,
      detailItem: [],
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
    filteredData() {
      if (this.$store.getters.getSearch === "") {
        return this.listLocalCopy;
      } else {
        return this.listLocalCopy.filter(cell => {
          let searchEntry = this.search.toLowerCase();
          let caseInsesitiveCell = cell[0].toLowerCase();

          return caseInsesitiveCell.includes(searchEntry);
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

    option: {
      get() {
        return this.$store.getters.getCellTypeSortOption;
      },
      set(option) {
        this.$store.dispatch("changeCellTypeSortOption", option);
      }
    },

    search: {
      get() {
        return this.$store.getters.getCellTypeSearchEntryInSearchView;
      },
      set(input) {
        this.$store.dispatch("changeCellTypeSearchEntryInSearchView", input);
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
    },
    sortBasedOnOption(option) {
      let globalThis = this;
      this.$store.dispatch("changeCellTypeSortOption", String(option));
      this.listLocalCopy = this.generateListCopy(this.cellData);
      switch (option) {
        case "alphabetical":
          globalThis.listLocalCopy = _.sortBy(
            this.listLocalCopy,
            [
              function(list) {
                return list[0];
              }
            ],
            ["asc"]
          );
          return globalThis.listLocalCopy;
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
  max-height: 350px;
  overflow-y: auto;
}
.title {
  margin-top: 10px;
}
.list-item-box {
  text-align: left;
}
.web-link {
  text-decoration: underline;
}
.fade {
  color: grey;
}
.values {
  margin: 10px;
}
</style>
