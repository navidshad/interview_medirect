<template>
  <InputSelect keyValue="code" :options="baseList" v-model="baseCurrency" />
  <InputSelect keyValue="code" :options="quoteList" v-model="quoteCurrency" />
</template>

<script>
export default {
  props: {
    // {code, label}
    assets: {
      type: Array,
      default: () => [],
    },

    modelValue: Object,
  },

  computed: {
    baseList() {
      return this.assets.filter((i) => i.code !== this.quoteCurrency);
    },
    quoteList() {
      return this.assets.filter((i) => i.code !== this.baseCurrency);
    },
  },

  data() {
    return {
      baseCurrency: "",
      quoteCurrency: "",
    };
  },

  watch: {
    baseCurrency: "onChange",
    quoteCurrency: "onChange",

    modelValue(value) {
      if (!value) return;

      this.baseCurrency = value.baseCurrency;
      this.quoteCurrency = value.quoteCurrency;
    },
  },

  methods: {
    onChange() {
      if (!this.baseCurrency.length || !this.quoteCurrency.length) return;

      let change = {
        baseCurrency: this.baseCurrency,
        quoteCurrency: this.quoteCurrency,
        get pairs() {
          return this.baseCurrency + this.quoteCurrency;
        },
      };

      this.$emit("update:modelValue", change);
    },
  },
};
</script>