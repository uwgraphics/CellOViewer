<template>
  <v-layout row wrap align-center>
    <v-flex md12>
      <v-card max-height="500">
        <v-card-title class="justify-left">
          <h4 class="view-title">List View</h4>
        </v-card-title>
        <v-card-text>
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
          <v-layout row wrap class="list" :class="{ 'max-height': listHeight }">
            <v-flex md12 v-if="loaded&&listLocalCopy">
              <v-list>
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
                      v-if="keyValuePair[0]&&keyValuePair[1]"
                      class="index"
                    >{{ keyValuePair[0] }}:&nbsp;</v-flex>
                    <v-flex md6 offset-md1 v-if="keyValuePair[1]">
                      <v-list v-for="(neighbor, index) in keyValuePair[1]" :key="index" dense>
                        <span v-if="index===(keyValuePair[1].length - 1)">{{ neighbor }}</span>
                        <span v-else>{{ neighbor }},</span>
                      </v-list>
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
export default {
  name: "cell-list",
  props: {
    cellData: Object
  },
  mounted() {},
  data() {
    return {
      cardHeight: this.$store.getters.getCardHeight,
      detailItem: [],
      listHeight: "400px",
      listLocalCopy: [],
      listSize: 2, // Put this in store at cleanup phase
      loaded: false,
      sortOptions: ["default", "neighbors"]
    };
  },
  methods: {
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
    sortBasedOnOption(option) {
      this.$store.dispatch("changeOption", String(option));
      this.listLocalCopy = this.generateListCopy(this.cellData);
      switch (option) {
        case "neighbors":
          this.listLocalCopy = this.listLocalCopy.sort((a, b) =>
            a[1].length < b[1].length ? 1 : -1
          );
          break;
      }
    },
    test(keyValuePair) {
      console.log("This click works");
    }
  },
  computed: {
    filteredData() {
      if (this.$store.getters.getSearch === "") {
        return this.listLocalCopy;
      } else {
        return this.listLocalCopy.filter(cell => {
          return cell[0].includes(this.search) || cell[1].includes(this.search);
        });
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
    }
  },
  watch: {
    cellData() {
      this.loaded = true;
      this.listLocalCopy = this.generateListCopy(this.cellData);
    }
  }
};
</script>

<style scoped>
v-card-title {
  margin: 100px;
}
.list {
  max-height: 300px;
  overflow-y: auto;
}
.title {
  margin-top: 10px;
}
</style>