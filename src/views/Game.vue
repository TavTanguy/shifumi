<template>
  <div class="game">
    <shi-fu-mi @started="partyStarted" ref="shiFuMi" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// @ is an alias to /src
import ShiFuMi from "@/components/ShiFuMi.vue";
import partyStartedStore from "@/scripts/partyStartedStore";
import connection from "@/scripts/Connection";

export default Vue.extend({
  name: "Game",
  components: { ShiFuMi },
  data: () => ({}),
  methods: {
    partyStarted() {
      partyStartedStore.value = true;
    },
    quit() {
      (this.$refs.shiFuMi as { quit: Function } & Element).quit();
    }
  },
  mounted() {
    connection.init(this);
    partyStartedStore.onChange(value => {
      if (value === false) this.quit();
    });
  }
});
</script>
