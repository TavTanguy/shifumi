<template>
  <div class="text-center px-3">
    <h1 class="display-1 py-10">Rejoindre une partie de ShiFuMi</h1>
    <v-btn color="success" x-large @click="joinParty" :loading="loading">Rejoindre</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import connection from "../scripts/Connection";

export default Vue.extend({
  data: () => ({
    nameParty: "",
    loading: false
  }),
  methods: {
    joinParty() {
      this.loading = true;
      connection.joinParty(this.nameParty);
      this.$router.push("/");
    }
  },
  mounted() {
    connection.init(this);
    const search = new URLSearchParams(location.search);
    const nameParty = search.get("nameParty");
    if (!nameParty) this.$router.push("/");
    else this.nameParty = nameParty;
  }
});
</script>
