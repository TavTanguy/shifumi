<template>
  <v-overlay v-model="store.loading" z-index="9990">
    <v-btn icon loading />
  </v-overlay>
</template>

<script lang="ts">
import Vue from "vue";
import storeApp from "../scripts/Store";
export default Vue.extend({
  data: () => ({
    store: storeApp.store
  })
});
</script>
