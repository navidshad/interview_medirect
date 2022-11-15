<template>
  <div class="rounded-full bg-gray-500 overflow-hidden w-5 h-5">
    <div v-if="code" class="currency-flag w-5 h-5" :class="[flagCLass]" />
  </div>
</template>

<script>
import "currency-flags/dist/currency-flags.min.css";

export default {
  props: {
    code: String,
  },

  computed: {
    flagCLass() {
      return "currency-flag-" + this.code.toLowerCase();
    },
  },
};
</script>

<style scoped>
.currency-flag {
  width: 100% !important;
  height: 100% !important;
  background-position: center;
}
</style>
