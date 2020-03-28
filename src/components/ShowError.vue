<template>
  <v-snackbar
    style="z-index: 9991"
    :value="store.generalError !== ''"
    color="red darken-2 text--white"
    bottom
    right
    :timeout="(store.permanentError)?0:3000"
    @input="store.generalError = ''"
  >
    {{ store.generalError }}
    <v-btn
      color="orange lighten-1"
      v-if="!store.permanentError"
      text
      @click.native="store.generalError = ''"
    >Fermer</v-btn>
  </v-snackbar>
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
