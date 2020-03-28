<template>
  <div class="showResult text-center">
    <h1 class="display-2 py-10">{{ textResult }}</h1>
    <div class="d-flex justify-center px-3">
      <card :idCard="store.partyResult.yourCard || 0" subtitle="Vous" />
      <v-icon v-if="store.partyResult.partyResult === 1" size="60" class="mx-6" color="green darken-1">mdi-check-bold</v-icon>
      <v-icon v-if="store.partyResult.partyResult === 2" size="60" class="mx-6" color="red darken-1">mdi-close-thick</v-icon>
      <div v-if="store.partyResult.partyResult === 0" class="mx-6 d-flex flex-column justify-center">
        <v-icon size="40" color="grey darken-1" class="mr-2">mdi-arrow-left</v-icon>
        <v-icon size="40" color="grey darken-1" class="ml-2">mdi-arrow-right</v-icon>
      </div>
      <card :idCard="store.partyResult.cardOfOpponent || 0" subtitle="Ennemi" />
    </div>
    <v-btn color="success" x-large class="mt-12" @click="voteRestart" :loading="store.voteRestartSended">Rejouer</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "./Card.vue";
import storeApp, { PartyResult } from "../scripts/Store";
import connection from "../scripts/Connection";
export default Vue.extend({
  components: { Card },
  data: () => ({
    store: storeApp.store
  }),
  computed: {
    textResult() {
      switch (storeApp.store.partyResult?.partyResult) {
        case PartyResult.win:
          return "Vous avez gagné";
        case PartyResult.lose:
          return "Vous avez perdu";
        default:
          return "Égalité";
      }
    }
  },
  methods: {
    voteRestart() {
      if (this.store.voteRestartSended) return;
      this.store.voteRestartSended = true;
      connection.voteRestart();
    }
  }
});
</script>
