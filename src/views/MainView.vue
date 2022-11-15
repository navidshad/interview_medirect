<template>
  <div
    class="
      md:w-screen
      md:h-screen
      md:flex
      md:flex-col
      md:justify-center
      md:items-center
    "
  >
    <div class="items-center w-full px-3 md:flex xl:w-2/3">
      <!-- PAIR SELECTION FORM -->
      <!--  -->
      <form
        class="
          w-full
          md:h-full
          mb-8
          md:pr-4 md:flex md:flex-col md:items-end md:mb-0 md:w-1/3
        "
      >
        <!-- TITLE AND SUBTITLE -->
        <section class="self-start mb-4">
          <h1
            class="
              text-3xl
              mt-4
              md:mt-0 md:text-xl
              lg:text-2xl
              xl:text-3xl
              font-bold
            "
          >
            {{ $filter.firstLatterUp(assetType) }} Exchange
          </h1>
          <p class="text-xs md:text-sm lg:text-base">
            Check out the current price for a pair
          </p>
        </section>

        <!-- XCHANGE SELECTOR -->
        <div class="w-full">
          <InputSelect
            label="Type of assets"
            class="mt-2"
            :options="xchanges"
            v-model="assetType"
          />
        </div>

        <!-- PAIR SELECTOR -->
        <InputPairs
          :key="assetType"
          class="mt-2 w-full"
          label="Pairs"
          :assets="assets"
          v-model="selectedPair"
        />

        <!-- LIVE DATA DESCRIPTION -->
        <aside class="my-2 w-full self-start md:w-48">
          <p class="text-sm">
            Live data is available only for specific pairs,
            <a
              class="text-blue-600"
              target="_blank"
              href="https://tradermade.com/streaming-fx/currencies-list"
              ><span>see the list</span></a
            >.
          </p>
        </aside>
      </form>

      <!-- PAIR CHART -->
      <!--  -->
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
