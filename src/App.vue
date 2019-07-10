<template>
  <div id="app">
    <v-app :dark="goDark">
      <v-container bg grid-list-md text-xs-center>
        <v-layout row justify-space-between>
          <v-flex md2>
            <v-switch color="primary" :label="selectedTheme" v-model="goDark"></v-switch>
          </v-flex>
          <v-spacer></v-spacer>
        </v-layout>
        <v-layout row wrap align-center>
          <v-flex>
            <HelloWorld msg="Boilerplate for Cell Netowrk Viewer" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  },
  computed: {
    selectedTheme: function() {
      return this.goDark ? "Dark Theme" : "Light Theme";
    }
  },
  data: function() {
    return {
      goDark: false,
      search: ""
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
