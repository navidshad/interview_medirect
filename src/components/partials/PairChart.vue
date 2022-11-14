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

    <!-- <apexchart /> -->
  </section>
</template>

<script>
import intervals from "../../helpers/intervals";
import { mapActions, mapGetters } from "vuex";

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
    ...mapGetters("chart", ["series"]),

    chartOptions() {
      return {
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
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
      deep:true,
      handler(newValue, old) {
        if (newValue == old || this.pair == null) return;
        if(!newValue.baseCurrency || !newValue.quoteCurrency) return;
        this.onIntervalChanged();
      }
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