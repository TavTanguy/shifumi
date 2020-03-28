<template>
  <div class="waitScreen text-center">
    <show-name-party />
    <h1 class="display-2 py-10">Bienvenue sur ShiFuMi</h1>
    <v-divider class="my-5" />
    <v-btn color="success" x-large @click="createParty">Créer une partie</v-btn>
    <p class="my-5 headline">ou</p>
    <v-form @submit.prevent="joinParty">
      <v-text-field v-model="store.namePartyToJoin" label="Code partie" style="width: 50vw" class="mx-auto" type="number" :error-messages="store.strErrorPartyJoin" />
      <v-btn color="success" large type="submit">Rejoindre</v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import connection from "../scripts/Connection";
import ShowNameParty from "../components/ShowNameParty.vue";
import storeApp from "../scripts/Store";
export default Vue.extend({
  components: { ShowNameParty },
  data: () => ({
    store: storeApp.store
  }),
  methods: {
    createParty() {
      connection.createParty();
    },
    joinParty() {
      connection.joinParty(this.store.namePartyToJoin);
    }
  }
});
</script>
