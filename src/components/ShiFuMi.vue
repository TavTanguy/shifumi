<template>
  <div>
    <wait-screen v-show="showWaitScreen" />
    <select-card v-show="showSelectCard" />
    <show-result v-show="showResult" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import storeApp, { StatusParty } from "../scripts/Store";
import WaitScreen from "./WaitScreen.vue";
import SelectCard from "./SelectCard.vue";
import ShowResult from "./ShowResult.vue";
import connection from "../scripts/Connection";
import partyStartedStore from "../scripts/partyStartedStore";
export default Vue.extend({
  components: {
    WaitScreen,
    SelectCard,
    ShowResult
  },
  data: () => ({
    store: storeApp.store
  }),
  computed: {
    showWaitScreen() {
      if (this.store.statusParty === StatusParty.waitScreen) {
        partyStartedStore.value = false;
        return true;
      }
      return false;
    },
    showSelectCard() {
      if (this.store.statusParty === StatusParty.selectCard) {
        this.$emit("started");
        return true;
      }
      return false;
    },
    showResult() {
      return this.store.statusParty === StatusParty.showResult;
    }
  },
  methods: {
    quit() {
      connection.quitParty();
    }
  }
});
</script>
