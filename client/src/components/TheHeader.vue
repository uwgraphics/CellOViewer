<template>
  <v-layout row wrap align-center>
    <v-flex md12 center>
      <h1 class="view-title">{{ msg }}</h1>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "app-header",
  props: {
    msg: String
  }
};
</script>

<style scope>
</style>
