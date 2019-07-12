<template>
  <v-layout row wrap align-center>
    <v-flex md12>
      <v-card height="600">
        <v-card-title>
          <h2>The list shall go here</h2>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex md12 ma-3>
              <v-text-field
                v-model="search"
                label="search the cell"
                single-line
                hide-details
                hide-no-data
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap id="list">
            <v-flex md12 v-if="loaded">
              <v-list v-for="(neighborList, index) in cellData" :key="index" id="index">
                <v-layout>
                  <v-flex md2 offset-md1 v-if="index&&neighborList">{{ index }}:</v-flex>
                  <v-flex md8 offset-md1 v-if="neighborList">
                    <v-list v-for="(neighbor, index) in neighborList" :key="index" dense>
                      <span v-if="index===(neighborList.length - 1)">{{ neighbor }}</span>
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
      loaded: false,
      search: ""
    };
  },
  methods: {},
  computed: {},
  watch: {
    cellData() {
      this.loaded = true;
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
</style>