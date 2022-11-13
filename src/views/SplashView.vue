<template>
  <div class="about">
    <h1>Splash Screen</h1>
  </div>
</template>

<script>
import { sleep } from '../helpers/promise';

export default {
  created() {
    sleep(3000).then(this.goToMain)
  },

  methods: {
    goToMain() {
      this.$router.push({name:'main'})
    }
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
