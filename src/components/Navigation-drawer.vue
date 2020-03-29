<template>
  <v-navigation-drawer :value="value" @input="emitInput" app temporary>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">Small Web Games</v-list-item-title>
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
      <v-list-item to="/infos">
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

    <template slot="append">
      <v-list>
        <v-list-item link @click="swithDarkMode">
          <v-list-item-icon>
            <v-icon>{{ $vuetify.theme.dark ? "mdi-brightness-5" : "mdi-brightness-4" }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Mode {{ $vuetify.theme.dark ? "claire" : "sombre" }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
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
    },
    swithDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("darkMode", this.$vuetify.theme.dark + "");
    }
  },
  mounted() {
    const modeDark = localStorage.getItem("darkMode");
    if (modeDark) this.$vuetify.theme.dark = /true/.test(modeDark);
  }
});
</script>
