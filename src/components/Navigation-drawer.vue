<template>
  <v-navigation-drawer :value="value" @input="emitInput" app temporary>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Small Web Games
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider />

    <v-list nav>
      <v-list-item to="/">
        <v-list-item-icon>
          <v-img src="/icons/favicon-32x32-dunplab-manifest-1528.png" height="24px" width="24px" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>ShiFuMi</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-information-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Infos</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item href="https://github.com/TavTanguy">
        <v-list-item-icon>
          <v-icon>mdi-github</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>GitHub</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    value: Boolean
  },
  methods: {
    emitInput(value: boolean) {
      this.$emit("input", value);
    }
  }
});
</script>
