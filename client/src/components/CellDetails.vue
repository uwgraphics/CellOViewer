<template>
  <v-layout row wrap align-center>
    <v-flex md12>
      <v-card :class="{ height:cardHeight }">
        <v-card-title class="justify-center">
          <h2 class="title">The cell details shall go here</h2>
        </v-card-title>
        <v-card-text>
          <v-btn class="ma-2" color="red" dark @click="removeDetailObject">
            Remove Data
            <v-icon dark right>remove_circle</v-icon>
          </v-btn>
          <v-layout row wrap>
            <v-flex md12 sm12 v-if="Object.keys(detailObject).length !== 0" id="title">
              <h3>{{ detailObject[0][1] }}</h3>
              <v-list v-if="detailObject[1]" id="list">
                <v-list-item v-for="(neighbor, index) in detailObject[1][1]" :key="index" dense>
                  <span v-if="index===(detailObject[1].length - 1)">{{ neighbor }}</span>
                  <span v-else>{{ neighbor }},</span>
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
  name: "cell-details",
  props: [],
  mounted() {},
  data() {
    return {
      cardHeight: this.$store.getters.getCardHeight,
      detailObjectLocal: {}
    };
  },
  methods: {
    removeDetailObject() {
      this.$store.dispatch("changeDetailObject", {});
    }
  },
  computed: {
    detailObject: {
      get() {
        return this.$store.getters.getDetailObject;
      }
    }
  },
  watch: {
    detailObject() {
      console.log(this.$store.getters.getDetailObject);
    }
  }
};
</script>

<style scoped>
#title {
  color: #42b983;
  font-weight: bold;
  text-align: left;
}
#list {
  max-height: 400px;
  overflow-y: auto;
}
</style>