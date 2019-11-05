<template>
  <v-layout row wrap align-center>
    <v-flex md12>
      <v-card max-height="595">
        <v-card-title class="justify-center">
          <h4 class="view-title">Gene Details View</h4>
          <v-spacer></v-spacer>
          <v-btn medium color="red" justify-right dark @click="removeGeneDetails">
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
              <h3 class="sub-title">Gene: {{ geneSelected }}</h3>
              <div class="gene-web-link">
                <a target="_blank" @click="navigateToGenePage()">Gene data web link</a>
              </div>
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
      sortOptions: ["default", "strength", "magnitude"]
    };
  },
  methods: {
    async fetchData() {
      let data = await d3.json("./top_abs_10_dict.json");
      this.loadedDictData = Object.assign({}, data);
    },
    filterBySearchList(list) {
      let globalThis = this;
      let filterBySearchList = [];
      list.forEach(element => {
        if (element[0].includes(globalThis.search)) {
          filterBySearchList.push(element);
        }
      });
      return filterBySearchList;
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
            let geneValue = value[i][1];
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
      let globalThis = this;
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
      }
    },
    topGeneDataExist(topGenes, cellTypeName) {
      return typeof topGenes[this.geneSelected] !== "undefined";
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
  max-height: 395px;
  overflow-y: auto;
}
.gene-web-link {
  text-align: left;
  margin-top: 10px;
  text-decoration: underline;
}
</style>