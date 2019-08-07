<template>
  <v-layout row wrap align-center>
    <v-flex md12>
      <v-card height="700">
        <v-card-title class="justify-center">
          <h2 class="title">List View</h2>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex md8 sm12>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="search the cell"
                single-line
                hide-details
                hide-no-data
              ></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md3 sm12>
              <v-select
                v-model="option"
                :items="sortOptions"
                @input="sortBasedOnOption"
                label="sort"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row wrap id="list" :class="{ 'max-height': listHeight }">
            <v-flex md12 v-if="loaded&&listLocalCopy">
              <v-list>
                <v-list-item
                  v-for="(keyValuePair, index) in filteredData"
                  :key="index"
                  @click="setDetailItem(keyValuePair)"
                >
                  <v-layout>
                    <v-flex
                      md2
                      offset-md1
                      v-if="keyValuePair[0]&&keyValuePair[1]"
                      class="index"
                    >{{ keyValuePair[0] }}:</v-flex>
                    <v-flex md8 offset-md1 v-if="keyValuePair[1]">
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
      loaded: false,
      sortOptions: ["default", "neighbors"]
    };
  },
  methods: {
    setDetailItem(item) {
      console.log(item);
      console.log(Object.entries(_.cloneDeep(item)));
      this.$store.dispatch(
        "changeDetailObject",
        Object.entries(_.cloneDeep(item))
      );
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
        const regex = new RegExp(this.search, "i");
        return this.listLocalCopy.filter(cell => {
          return regex.test(cell[0]) || regex.test(cell[1]);
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
    },
    search() {
      console.log(this.search);
    }
  }
};
</script>

<style scoped>
#list {
  max-height: 500px;
  overflow-y: auto;
}
v-card-title {
  margin: 100px;
}
</style>