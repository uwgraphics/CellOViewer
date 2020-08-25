<template>
    <v-list-item
        three-line
        @click="setGeneItem(source.id)"
    >
        <v-list-item-content class="list-item-box">
        <v-list-item-title
            >{{ $store.state.loadedGeneIdToNameDict[source.id] }}:&nbsp;
        </v-list-item-title>
        <v-list-item-subtitle>
            <a class="web-link" @click="navigateToGenePage(source.id)">
            {{ source.id }}
            </a>
        </v-list-item-subtitle>
        <v-list-item-subtitle>
            {{ $store.state.loadedGeneIdToDescriptionDict[source.id] }}
        </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
  export default {
    name: 'gene-list-item',
    props: {
      index: { // index of current item
        type: Number
      },
      source: { // here is: {uid: 'unique_1', text: 'abc'}
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
        navigateToGenePage(item) {
            window.open(
                "http://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=" + item
            );
        },
        setGeneItem(gene) {
        this.$store.dispatch("changeGeneSelected", gene);
        },
    }
  }
</script>

<style scoped>
v-card-title {
  margin: 100px;
}
.list {
  max-height: 350px;
  overflow-y: auto;
}
.title {
  margin-top: 10px;
}
.list-item-box {
  text-align: left;
}
.web-link {
  text-decoration: underline;
}
</style>