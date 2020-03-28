<template>
  <v-dialog :value="store.nameParty !== ''" persistent max-width="500px" transition="dialog-transition">
    <v-card loading>
      <v-card-title primary-title>Attente d'un joueur</v-card-title>
      <v-divider />
      <v-card-text class="mt-4 px-12 d-flex justify-center align-center">
        <v-btn icon>
          <v-icon @click="regenerateNameParty">mdi-reload</v-icon>
        </v-btn>
        <v-text-field label="Code partie" ref="textFieldNameParty" id="nameParty" readonly :value="store.nameParty" />
        <div>
          <v-btn v-if="btnShare" icon @click="shareNameParty">
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>
          <v-btn v-else icon @click="copyToClipboard">
            <v-icon>mdi-content-copy</v-icon>
          </v-btn>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" text @click="leaveParty">Quitter</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import storeApp from "../scripts/Store";
import connection from "../scripts/Connection";
import urls from "@/scripts/consts";
export default Vue.extend({
  data: () => ({
    store: storeApp.store,
    btnShare: false
  }),
  methods: {
    copyToClipboard() {
      const input = document.querySelector("#nameParty") as HTMLInputElement;
      if (input) {
        input.select();
        document.execCommand("copy");
      }
    },
    shareNameParty() {
      if (navigator.share) {
        navigator.share({
          title: "ShiFuMi",
          text: "Rejoins moi dans une partie de ShiFuMi",
          url: urls.urlClient + "/j?nameParty=" + this.store?.nameParty
        });
      }
    },
    regenerateNameParty() {
      connection.regenerateSecret();
    },
    leaveParty() {
      connection.leaveParty();
    }
  },
  mounted() {
    if (navigator.share) {
      this.btnShare = true;
    }
  }
});
</script>
