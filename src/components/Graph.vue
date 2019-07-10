<template>
  <v-layout row wrap align-center>
    <v-flex md12>
      <v-card height="600">
        <v-layout row wrap align-center>
          <v-spacer></v-spacer>
          <v-flex md3 mr-3>
            <v-text-field
              v-model="search"
              label="search the cell"
              single-line
              hide-details
              hide-no-data
            ></v-text-field>
          </v-flex>
          <v-card-text>
            <h2>The graph shall go here</h2>
          </v-card-text>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import * as d3 from "d3";
import d3Dag from "d3-dag";

export default {
  name: "cell-graph",
  props: ["cellData"],
  mounted() {},
  data() {
    return {
      search: ""
    };
  },
  methods: {},
  computed: {},
  watch: {
    cellData() {

    }
  }
};
</script>

<style>
</style>