<template>
  <v-card width="27vw" style="cursor: pointer" :disabled="disabled" :elevation="disabled ? 1 : 3">
    <v-card-actions v-if="subtitle" class="text-center headline d-block">{{ subtitle }}</v-card-actions>
    <v-img :src="card.url" height="20vh" contain />
    <v-card-title primary-title class="text-center title d-block">{{ card.name }}</v-card-title>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "../scripts/Card";
export default Vue.extend({
  props: {
    idCard: Number,
    subtitle: {
      required: false,
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    card() {
      return Card.get(this.idCard);
    }
  }
});
</script>
