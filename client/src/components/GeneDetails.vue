<template>
  <v-layout row wrap align-center>
    <v-flex md12>
      <v-card max-height="650">
        <v-card-title class="justify-center">
          <h2 class="title">Gene Details View</h2>
          <v-spacer></v-spacer>
          <v-btn medium color="red" justify-right dark @click="removeGeneDetails">
            <v-icon dark>remove_circle</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex md12 v-if="geneNotEmpty()">
              <v-select
                v-model="option"
                :items="sortOptions"
                @input="sortBasedOnOption"
                label="sort"
              ></v-select>
              <h3 class="sub-title">Gene: {{ geneSelected }}</h3>
              <v-list :class="{ 'max-height': listHeight }" class="list">
                <v-list-item
                  v-for="(value, index) in filteredGeneCellList"
                  :key="index"
                  @click="setCellSelected(value[0])"
                >
                  <v-layout>
                    <v-flex md3 offset-md1 class="index">{{ value[0] }}:&nbsp;</v-flex>
                    <v-flex md6 offset-md1>{{ value[1] }}</v-flex>
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
      listHeight: "400px",
      loadedDictData: {},
      sortOptions: ["default", "magnitude"]
    };
  },
  methods: {
    async fetchData() {
      let data = await d3.json("./top_abs_10_dict.json");
      this.loadedDictData = Object.assign({}, data);
    },
    formatToId(cellName) {
      return cellName
        .split(" ")
        .join("-")
        .split("(")
        .join("")
        .split(")")
        .join("")
        .replace(/\//g, "-");
    },
    geneNotEmpty() {
      return this.geneSelected !== "";
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
            let geneValue = value[i][1];
            list.push([cellName, geneValue]);
          }
        }
      }

      return list;
    },
    setCellSelected(cellName) {
      let curList = this.$store.getters.getCellSelected;
      if (curList.length > 1) {
        curList.pop();
      }
      curList.push(cellName);
      this.$store.dispatch("changeCellSelected", curList);
    },
    sortBasedOnOption() {
      return this.filteredList.sort((a, b) => (a[1] > b[1] ? -1 : 1));
    },
    topGeneDataExist(topGenes, cellTypeName) {
      return typeof topGenes[this.geneSelected] !== "undefined";
    }
  },
  computed: {
    filteredGeneCellList() {
      return this.$store.getters.getGeneSearchOption === "default"
        ? this.returnToDefaultList()
        : this.sortBasedOnOption();
    },
    geneSelected: {
      get() {
        return this.$store.getters.getGeneSelected;
      }
    },
    option: {
      get() {
        return this.$store.getters.getGeneSearchOption;
      },
      set(option) {
        this.$store.dispatch("changeGeneSearchOption", option);
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
  max-height: 420px;
  overflow-y: auto;
}
</style>