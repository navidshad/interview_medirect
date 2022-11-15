<template>
  <img :src="src" />
</template>

<script>
export default {
  props: ["name"],
  computed: {
    src() {
      const name = this.name;
      let src = "/src/assets/svg/";

      if (!name) return "";

      if (name.endsWith(".svg")) {
        src += name;
      } else {
        src += name + ".svg";
      }

      return src;
    },
  },
};
</script>
