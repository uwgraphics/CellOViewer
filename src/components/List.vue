<template>
  <v-layout row wrap align-center>
    <v-flex md12>
      <v-card height="600">
        <v-card-title class="justify-center">
          <h2>The list shall go here</h2>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex md8>
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
            <v-flex md3>
              <v-select
                v-model="option"
                :items="sortOptions"
                @input="sortBasedOnOption"
                label="sort"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row wrap id="list">
            <v-flex md12 v-if="loaded&&listLocalCopy">
              <v-list v-for="(keyValuePair, index) in listLocalCopy" :key="index" id="index">
                <v-layout>
                  <v-flex md2 offset-md1 v-if="keyValuePair[0]&&keyValuePair[1]">{{ keyValuePair[0] }}:</v-flex>
                  <v-flex md8 offset-md1 v-if="keyValuePair[1]">
                    <v-list v-for="(neighbor, index) in keyValuePair[1]" :key="index" dense>
                      <span v-if="index===(keyValuePair[1].length - 1)">{{ neighbor }}</span>
                      <span v-else>{{ neighbor }},</span>
                    </v-list>
                  </v-flex>
                </v-layout>
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
  props: ["cellData"],
  mounted() {},
  data() {
    return {
      listLocalCopy: [],
      loaded: false,
      sortOptions: ["default", "neighbors"]
    };
  },
  methods: {
    sortBasedOnOption(option) {
      this.$store.dispatch("changeOption", String(option));
      this.listLocalCopy = this.generateDefaultList();
      switch (option) {
        case "neighbors":
          this.listLocalCopy = this.listLocalCopy.sort((a, b) => (a[1].length < b[1].length ? 1 : -1));
          break;
      }
    },
    generateDefaultList() {
      return Object.entries(Object.assign({}, this.cellData));
    }
  },
  computed: {
    search: {
      get() {
        return this.$store.getters.getSearch;
      },
      set(keyValuePair) {
        return this.$store.dispatch("changeSearch", keyValuePair);
      }
    },
    option: {
      get() {
        return this.$store.getters.getOption;
      },
      set(keyValuePair) {
        return this.$store.dispatch("changeOption", keyValuePair);
      }
    }
  },
  watch: {
    cellData() {
      this.loaded = true;
      this.listLocalCopy = this.generateDefaultList();
      console.log(this.listLocalCopy);
    },
    option() {

    }
  }
};
</script>

<style scoped>
#index {
  color: #42b983;
  font-weight: bold;
}
#list {
  max-height: 400px;
  overflow-y: auto;
}
v-card-title {
  margin: 100px;
}
</style>