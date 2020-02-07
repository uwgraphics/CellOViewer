<template>
  <v-card-text
    :style="{
      background:
        $vuetify.theme.themes[this.$store.getters.getCurrentThemeMode]
          .background
    }"
  >
    <v-layout>
      <!-- Search Box -->
      <v-flex md9 sm12>
        <v-text-field
          v-model="cellTypeSearchEntry"
          append-icon="search"
          label="search"
          single-line
          hide-details
          hide-no-data
        />
      </v-flex>

      <v-spacer />

      <!-- Sort Box -->
      <v-flex md3 sm12>
        <v-select
          v-model="option"
          :items="sortOptions"
          label="sort"
          @input="sortBasedOnOption"
        />
      </v-flex>
    </v-layout>

    <v-layout row class="list" :class="{ 'max-height': listHeight }">
      <v-flex v-if="listLocalCopy" md12>
        <v-list
          :style="{
            background:
              $vuetify.theme.themes[this.$store.getters.getCurrentThemeMode]
                .background
          }"
        >
          <v-list-item
            v-for="(keyValuePair, index) in filteredCellTypeData"
            :key="index"
            @click="setSelectedCellTypeList(keyValuePair[0])"
          >
            <v-layout>
              <!-- Cell Type Keyword -->
              <v-flex
                v-if="loaded && keyValuePair[0] != null"
                md3
                offset-md1
                class="index"
              >
                {{ keyValuePair[0] }}:&nbsp;
              </v-flex>

              <!-- Case of No Children -->
              <v-flex v-if="keyValuePair[1].length == 0" md6 offset-md1>
                <div class="fade values">No direct children</div>
              </v-flex>

              <!-- Case of Only One Children -->
              <v-flex v-else-if="keyValuePair[1].length == 1" md6 offset-md1>
                <div class="cell-type-children">
                  {{ keyValuePair[1][0] }}
                </div>
              </v-flex>

              <!-- Case of More Than One Children -->
              <v-flex v-else md6 offset-md1>
                <v-expansion-panels
                  class="cell-type-children"
                  @click.native.stop
                >
                  <v-expansion-panel color="primary">
                    <v-expansion-panel-header>
                      {{ keyValuePair[1].length + " direct children" }}
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
</template>

<script>
import * as d3 from "d3";

export default {
  name: "CellTypeCentricSearchTab",

  cellData: {
    type: Object,
    default: function() {
      return { message: "cell data is here" };
    }
  },

  data() {
    return {
      listHeight: "500px",
      listLocalCopy: [],
      listSize: 2, // Put this in store at cleanup phase
      loaded: false,
      loadedDictData: {},
      sortOptions: ["default", "alphabetical"]
    };
  },

  computed: {
    cellTypeSearchEntry: {
      get() {
        return this.$store.getters.getCellTypeSearchEntryInSearchView;
      },
      set(input) {
        this.$store.dispatch("changeCellTypeSearchEntryInSearchView", input);
      }
    },

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

    option: {
      get() {
        return this.$store.getters.getCellTypeSortOption;
      },
      set(option) {
        this.$store.dispatch("changeCellTypeSortOption", option);
      }
    }
  },

  watch: {
    cellData() {
      this.loaded = true;
      this.listLocalCopy = this.generateListCopy(this.cellData);
    }
  },

  methods: {
    async fetchData() {
      this.loadedDictData = await d3.json("./top_abs_10_dict.json");
    },

    setSelectedCellTypeList(cellName) {
      let curList = this.$store.getters.getSelectedCellTypeList;
      while (curList.length >= this.listSize) {
        curList.pop();
      }
      curList.push(cellName);
      this.$store.dispatch("changeSelectedCellTypeList", curList);
    },

    sortBasedOnOption(option) {
      let globalThis = this;
      this.$store.dispatch("changeCellTypeSortOption", String(option));
      this.listLocalCopy = this.generateListCopy(
        this.$store.getters.getCellTypeGraphStructureData
      );
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
  },

  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
.index {
  max-width: 12em;
}
.list {
  max-height: 350px;
  overflow-y: auto;
}
.fade {
  text-align: center;
}
</style>
