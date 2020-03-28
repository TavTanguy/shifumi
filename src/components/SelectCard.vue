<template>
  <div class="selectCard text-center">
    <h1 class="display-2 py-10">Selectionez une carte</h1>
    <v-form @submit.prevent="sendCard">
      <div class="d-flex justify-space-around px-3">
        <div v-for="card in idsCards" :key="card" @click="selectCard(card)">
          <card
            :idCard="card"
            :disabled="store.currentCardSelected !== card && store.currentCardSelected !== undefined"
          />
        </div>
      </div>
      <v-btn
        color="success"
        class="mt-12"
        x-large
        :loading="store.cardSelectLocked"
        type="submit"
      >Valider</v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "./Card.vue";
import connection from "../scripts/Connection";
import storeApp from "../scripts/Store";
export default Vue.extend({
  components: { Card },
  data: () => ({
    idsCards: [0, 1, 2],
    store: storeApp.store
  }),
  methods: {
    selectCard(cardId: number) {
      if (!this.store.cardSelectLocked) this.store.currentCardSelected = cardId;
    },
    sendCard() {
      if (
        this.store.cardSelectLocked ||
        this.store.currentCardSelected === undefined
      )
        return;
      this.store.cardSelectLocked = true;
      connection.sendCard(this.store.currentCardSelected);
    }
  }
});
</script>