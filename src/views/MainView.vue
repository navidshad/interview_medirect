<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <div class="items-center w-full sm:mx-3 md:flex md:w-2/3">
      <section class="w-full sm:mb-2 md:w-1/3">
        <InputSelect :options="xchanges" v-model="assetType" />
        <InputPairs :assets="assets" v-model="selectedPair" />
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