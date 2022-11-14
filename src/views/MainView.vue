<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center">
    <section class="fixed top-10">
      <h1 class="text-5xl font-bold">
        {{ $filter.firstLatterUp(assetType) }} Exchange
      </h1>
      <p>Check out the current price for a pair</p>
    </section>

    <div class="items-center w-full px-4 sm:mx-3 md:flex lg:w-2/3">
      <section class="w-full mb-8 md:mb-0 md:w-1/3">
        <InputSelect
          label="Type of assets"
          :options="xchanges"
          v-model="assetType"
        />
        <InputPairs
          class="mt-3"
          label="Pairs"
          :assets="assets"
          v-model="selectedPair"
        />
      </section>

      <section class="w-full md:w-2/3">
        <PairChartComponent :pair="selectedPair" />
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PairChartComponent from "../components/partials/PairChart.vue";

export default {
  components: { PairChartComponent },

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
      xchanges: [
        { label: "Forex", value: "currencies" },
        { label: "Crypto", value: "cryptos" },
      ],

      assetType: "currencies",
      selectedPair: null,
    };
  },

  watch: {
    assetType: {
      immediate: true,
      handler: "fetchPairs",
    },
  },

  methods: {
    ...mapActions("pairs", ["fetchCurrencies", "fetchCryptos"]),

    fetchPairs() {
      this.selectedPair = null;

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