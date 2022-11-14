<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <div class="flex flex-col items-center">
      <mat-svg-loader name="logo" width="256" />
      <h1 class="mt-2">
        Interview Assesment by <span class="text-blue-600">Navid Shad</span>
      </h1>
    </div>
  </div>
</template>

<script>
import { sleep } from "../helpers/promise";

export default {
  created() {
    sleep(3000).then(this.goToMain);
  },

  methods: {
    goToMain() {
      this.$router.push({name:'main'})
    },
  },
};
</script>
