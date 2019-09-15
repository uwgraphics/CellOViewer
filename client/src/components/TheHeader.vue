<template>
  <v-layout row wrap align-center>
    <v-flex md12 center>
      <h1 class="display-1 font-weight-medium">&#x1F9A0;{{ msg }}&#x1F9EC;</h1>
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

<style scoped>
</style>
