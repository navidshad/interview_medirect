import {
	get
} from "../helpers/http"

export default {
	namespace: true,

	state: {
		series: [],
	},

	getters: {},

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
				}) => commit('SET_SERIES', quotes))
		}
	}
}