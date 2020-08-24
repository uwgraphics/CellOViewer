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
          <h4 class="view-title">Search View</h4>
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
                  ></v-text-field>
                </v-flex>
                <v-spacer />
                <v-flex md3 sm12>
                  <v-select
                    v-model="option"
                    :items="sortOptions"
                    @input="sortBasedOnOption"
                    label="sort"
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-layout
                row
                wrap
                class="list"
                :class="{ 'max-height': listHeight }"
              >
                <v-flex md12 v-if="loaded && listLocalCopy">
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
                      class="list"
                      @click="setCellSelected(keyValuePair[0])"
                    >
                      <v-layout>
                        <v-flex
                          md3
                          offset-md1
                          v-if="keyValuePair[0] && keyValuePair[1]"
                          class="index"
                          >{{ keyValuePair[0] }}:&nbsp;</v-flex
                        >
                        <v-flex md6 offset-md1 v-if="keyValuePair[1]">
                          <v-list
                            v-for="(neighbor, index) in keyValuePair[1]"
                            :key="index"
                            dense
                          >
                            <div v-if="index === keyValuePair[1].length - 1">
                              {{ neighbor }}
                            </div>
                            <div v-else>{{ neighbor }},</div>
                          </v-list>
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
                    v-model="geneSearch"
                    append-icon="search"
                    label="search"
                    single-line
                    hide-details
                    hide-no-data
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <virtual-list :size="40" :remain="10" class="list">
                <v-list-item
                  three-line
                  v-for="item of filteredGeneData"
                  :key="item.id"
                  @click="setGeneItem(item)"
                >
                  <v-list-item-content class="list-item-box">
                    <v-list-item-title
                      >{{ loadedGeneIdToNameDict[item] }}:&nbsp;
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
/* eslint-disable */
import * as d3 from "d3";
import virtualList from "vue-virtual-scroll-list";
import _ from "lodash";

export default {
  name: "cell-list",
  props: {
    cellData: Object
  },
  mounted() {
    this.fetchData();
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
  methods: {
    async fetchData() {
      this.loadedGeneData = await d3.json("./genes.json");
      this.loadedDictData = await d3.json("./top_abs_10_dict.json");
      this.loadedGeneIdToNameDict = await d3.json("./gene_id_to_name.json");
      this.loadedGeneIdToDescriptionDict = await d3.json(
        "gene_id_to_description.json"
      );
    },
    setCellSelected(cellName) {
      let curList = this.$store.getters.getCellSelected;
      while (curList.length >= this.listSize) {
        curList.pop();
      }
      curList.push(cellName);
      this.$store.dispatch("changeCellSelected", curList);
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
      this.$store.dispatch("changeGeneSelected", gene);
    },
    sortBasedOnOption(option) {
      let globalThis = this;
      this.$store.dispatch("changeOption", String(option));
      this.listLocalCopy = this.generateListCopy(this.cellData);
      switch (option) {
        case "alphabetical":
          globalThis.listLocalCopy = _.sortBy(
            this.listLocalCopy,
            [
              function(list) {
                console.log(list[0]);
                return list[0];
              }
            ],
            ["asc"]
          );
          return globalThis.listLocalCopy;
      }
    }
  },
  computed: {
    filteredData() {
      if (this.$store.getters.getSearch === "") {
        return this.listLocalCopy;
      } else {
        return this.listLocalCopy.filter(cell => {
          let searchResult = this.search.toLowerCase();
          let caseInsesitiveCell0 = cell[0].toLowerCase();
          let caseInsesitiveCellList = cell[1];
          // Make all cell name in corresponding list to be lowercase
          for (const cell of caseInsesitiveCellList) {
            cell = cell.toLowerCase();
          }
          return (
            caseInsesitiveCell0.includes(searchResult) ||
            caseInsesitiveCellList.includes(searchResult)
          );
        });
      }
    },

    /**
     * Filtered gene data for gene centric view
     */
    filteredGeneData() {
      let globalThis = this;

      if (this.$store.getters.getGeneSearchFromSearchView === "") {
        return this.loadedGeneData;
      } else {
        return this.loadedGeneData.filter(gene => {
          if (globalThis.loadedGeneIdToNameDict[gene] == undefined) {
            return;
          }
          let upperGeneSearch = globalThis.geneSearch.toUpperCase();
          return globalThis.loadedGeneIdToNameDict[gene].includes(
            globalThis.geneSearch.toUpperCase()
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
        return this.$store.getters.getOption;
      },
      set(option) {
        this.$store.dispatch("changeOption", option);
      }
    },
    search: {
      get() {
        return this.$store.getters.getSearch;
      },
      set(input) {
        this.$store.dispatch("changeSearch", input);
      }
    },
    geneSearch: {
      get() {
        return this.$store.getters.getGeneSearchFromSearchView;
      },
      set(input) {
        this.$store.dispatch("changeGeneSearchFromSearchView", input);
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
      this.$store.dispatch("changeTopGeneCellList", []);
      for (const [key, value] of Object.entries(this.loadedDictData)) {
        let geneArr = value;
        for (let i = 0; i < geneArr.length; i++) {
          if (geneArr[i][2] === globalThis.geneSelected) {
            let cellName = key;
            let geneValue = value[i][1];
            globalThis.$store.dispatch("addToTopGeneCellList", [
              cellName,
              geneValue
            ]);
          }
        }
      }
    }
  },
  components: {
    "virtual-list": virtualList
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
</style>
