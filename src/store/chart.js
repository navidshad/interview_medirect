import {
	get
} from "../helpers/http"

// https://momentjs.com/
import moment from 'moment';

export default {
	namespaced: true,

	state: {
		series: [],
	},

	getters: {
		series: (state) => [{
			name: "Series 1",
			data: state.series
		}]
	},

	mutations: {
		SET_SERIES(state, data) {
			state.series = data;
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

					commit('SET_SERIES', quotes)
				})
		}
	}
}