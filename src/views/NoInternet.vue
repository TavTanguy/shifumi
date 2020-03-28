<template>
  <div class="text-center px-3">
    <h1 class="display-2 py-10">ShiFuMi</h1>
    <h2 class="headline py-10">Vous devez être connecté à internet pour jouer</h2>
    <v-icon x-large>mdi-wifi-off</v-icon>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import connection from "@/scripts/Connection";
export default Vue.extend({
  mounted() {
    connection.init(this);
  }
});
</script>
