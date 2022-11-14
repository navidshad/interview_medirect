import {
	get
} from "../helpers/http"

import {
	Calc
} from 'calc-js';

// https://momentjs.com/
import moment from 'moment';

export default {
	namespaced: true,

	state: {
		series: [],
		pair: "",
		currentPrice: 0,
		diffPrice: 0,
		diffPercent: 0,
	},

	getters: {
		series: (state) => [{
			name: state.pair,
			data: state.series
		}],

		currentPrice: (state) => state.currentPrice,
		diffPrice: (state) => state.diffPrice,
		diffPercent: (state) => state.diffPercent,
		isBullish: (state) => state.diffPrice >= 0
	},

	mutations: {
		SET_SERIES(state, [pair, data]) {
			state.series = data;
			state.pair = pair;
		},

		CALCULATE_DIIFS(state) {
			if (state.series.length) {
				state.currentPrice = state.series[state.series.length - 1][1];

				let start = state.series[0][1];
				let end = state.currentPrice;

				state.diffPrice = new Calc(end).minus(start).finish();
				state.diffPercent = 100 - new Calc(start).multiply(100).divide(end).finish()
			}
		},

		CLEAR_SERIES(state) {
			state.series = [];
			state.pair = "";
			state.currentPrice = 0;
			state.diffPrice = 0;
			state.diffPercent = 0;
		}
	},

	actions: {
		fetchTimeseries({
			commit
		}, {
			currency,
			interval,
			period,
			start_date,
			end_date
		}) {
			let query = {
				currency,
				interval,
				period,
				start_date,
				end_date,
				format: 'records',
			}

			return get('/timeseries', query)
				.then(({
					quotes
				}) => {
					quotes = quotes.map(({
						close,
						date
					}) => {
						date = moment.utc(date).valueOf()

						// https://apexcharts.com/docs/series/
						// Timeline Series
						return [date, close];
					})

					commit('SET_SERIES', [currency, quotes]);
					commit('CALCULATE_DIIFS');
				})
		}
	}
}