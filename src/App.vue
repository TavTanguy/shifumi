<template>
  <v-app>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>ShiFuMi</v-toolbar-title>
    </v-app-bar>
    <navigation-drawer v-model="drawer" />
    <v-content>
      <router-view />
    </v-content>
    <loading />
    <show-error />
    <v-footer class="d-flex justify-space-between">
      <v-btn v-if="showBtnQuit.value" color="secondary" text small @click="quitParty">Quitter</v-btn>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Loading from "@/components/Loading.vue";
import ShowError from "@/components/ShowError.vue";
import partyStartedStore from "@/scripts/partyStartedStore";
import NavigationDrawer from "@/components/Navigation-drawer.vue";
export default Vue.extend({
  name: "app",
  components: { Loading, ShowError, NavigationDrawer },
  data: () => ({
    showBtnQuit: partyStartedStore,
    drawer: false
  }),
  methods: {
    quitParty() {
      partyStartedStore.value = false;
    }
  }
});
</script>
