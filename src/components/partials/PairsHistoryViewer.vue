<template>
  <div class="items-center w-full sm:mx-3 md:flex md:w-2/3">
    <section class="w-full sm:mb-2 md:w-1/3">
      <InputPairs :assets="assets" v-model="selectedParis" />
    </section>

    <section class="w-full md:w-2/3 bg-gray-200 h-32">History Chart</section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    assetType: {
      type: String,
      default: "currencies",
      validator: (value) => ["cryptos", "currencies"].indexOf(value) > -1,
    },
  },

  computed: {
    ...mapGetters("pairs", [
      "totalCurrencies",
      "totalCryptos",
      "currencies",
      "cryptos",
    ]),

    assets() {
      return this[this.assetType];
    },
  },

  data() {
    return {
      selectedParis: null,
    }
  },

  created() {
    this.fetch();
  },

  methods: {
    ...mapActions("pairs", ["fetchCurrencies", "fetchCryptos"]),

    fetch() {
      let fetchAction,
        total = 0;

      if (this.assetType == "cryptos") {
        fetchAction = this.fetchCryptos;
        total = this.totalCryptos;
      } else {
        fetchAction = this.fetchCurrencies;
        total = this.totalCurrencies;
      }

      !total && fetchAction();
    },
  },
};
</script>