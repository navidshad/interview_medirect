<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <!-- <div class="max-w-2xl">
      <h1>Forex Exchange</h1>
    </div> -->
    <PairsHistoryViewerComponent />
  </div>
</template>

<script>
import PairsHistoryViewerComponent from '@/components/partials/PairsHistoryViewer.vue'

export default {
  components: {
    PairsHistoryViewerComponent,
  }
};
</script>

<style>
</style>