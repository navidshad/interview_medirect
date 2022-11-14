<template>
  <section class="h-96">
    <!-- Header 
		-->
    <div>
      <figure class="flex space-x-1">
        <mat-flag :code="(pair || {}).baseCurrency" />
        <mat-flag :code="(pair || {}).quoteCurrency" />
      </figure>
      <aside>
        <p class="font-bold">
          <span>{{ (pair || {}).baseCurrency }}</span>
		  <span>/</span>
          <span>{{ (pair || {}).quoteCurrency }}</span>
        </p>
      </aside>
    </div>

    <!-- Chart 
		-->
    <figure></figure>

    <!-- Footer 
		-->
    <nav></nav>

    <!-- <apexchart /> -->
  </section>
</template>

<script>
export default {
  props: {
    pair: Object,
  },
};
</script>

<style scoped>
</style>