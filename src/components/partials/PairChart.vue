<template>
  <section class="h-96">
    <!-- Header 
		-->
    <div class="mb-4" :class="{ 'opacity-0': !pair }">
      <figure class="flex space-x-1">
        <mat-flag :code="(pair || {}).baseCurrency" />
        <mat-flag :code="(pair || {}).quoteCurrency" />
      </figure>

      <div class="flex justify-between">
        <aside>
          <p class="font-bold">
            <span>{{ (pair || {}).baseCurrency || "..." }}</span>
            <span>/</span>
            <span>{{ (pair || {}).quoteCurrency || "..." }}</span>
          </p>
        </aside>

        <div v-if="currentPrice" class="flex flex-col items-end">
          <h2>
            <span class="mx-1">{{ (pair || {}).quoteCurrency }}</span>
            <span>{{ currentPrice }}</span>
          </h2>
          <h4
            class="text-xs"
            :class="{ 'text-green-600': isBullish, 'text-red-600': !isBullish }"
          >
            <span>{{ diffPrice }}</span>
            <span> ( {{ diffPercent }}% )</span>
          </h4>
        </div>
      </div>
    </div>

    <!-- Chart 
		-->
    <figure>
      <apexchart
        type="area"
        height="350"
        :options="chartOptions"
        :series="series"
      />
    </figure>

    <!-- Footer 
		-->
    <nav class="flex justify-center">
      <input-horizontal-select :options="intervals" v-model="interval" />
    </nav>
  </section>
</template>

<script>
import intervals from "../../helpers/intervals";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  props: {
    pair: Object,
  },

  data() {
    return {
      intervals: intervals.getList().map((i) => {
        return { label: i, value: i };
      }),

      interval: "1D",
    };
  },

  computed: {
    ...mapGetters("chart", [
      "series",
      "currentPrice",
      "diffPrice",
      "diffPercent",
      "isBullish",
    ]),

    chartOptions() {
      const colors = [this.isBullish ? "#22c55e" : "#ef4444"];

      return {
        colors,
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        fill: {
          colors,
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          opposite: true,
        },
        legend: {
          horizontalAlign: "left",
        },
      };
    },
  },

  watch: {
    pair: {
      deep: true,
      handler(newValue, old) {
        if (newValue == null) {
          this.CLEAR_SERIES();
          return;
        }

        if (newValue == old) return;

        if (!newValue.baseCurrency || !newValue.quoteCurrency) return;

        this.onIntervalChanged();
      },
    },

    interval: {
      deep: true,
      handler(newValue, old) {
        if (newValue == old || this.pair == null) return;
        this.onIntervalChanged();
      },
    },
  },

  methods: {
    ...mapActions("chart", ["fetchTimeseries"]),
    ...mapMutations("chart", ["CLEAR_SERIES"]),

    onIntervalChanged() {
      let query = {
        currency: this.pair.pair,
        ...intervals[this.interval](),
      };

      this.fetchTimeseries(query);
    },
  },
};
</script>

<style scoped>
</style>