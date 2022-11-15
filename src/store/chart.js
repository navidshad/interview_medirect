import {
	get
} from "../helpers/http"

import {
	Calc
} from 'calc-js';

// https://momentjs.com/
import moment from 'moment';
import { executeAfterOneSec } from "../helpers/second";

export default {
	namespaced: true,

	state: {
		series: [],
		pair: "",
		currentPrice: 0,
		diffPrice: 0,
		diffPercent: 0,

		socket: null,
	},

	getters: {
		series: (state) => [{
			name: state.pair,
			data: state.series
		}],

		chartLoaded: (state) => !!state.pair,

		pair: (state) => state.pair,
		currentPrice: (state) => state.currentPrice,
		diffPrice: (state) => state.diffPrice,
		diffPercent: (state) => state.diffPercent,
		isBullish: (state) => state.diffPrice >= 0,

		isLive: (state) => !!state.socket,
	},

	mutations: {
		SET_SERIES(state, [pair, data]) {
			state.series = data;
			state.pair = pair;
		},

		UPDATE_LAST_PRICE(state, price) {
			if (!state.series.length) return;
			state.series[state.series.length - 1][1] = price
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
		},

		SET_SOCKET_CLIENT(state, client) {
			state.socket = client;
		},
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
		},

		connectSocket({
			getters,
			commit,
		}) {
			const serverUrl =
				import.meta.env.VITE_SOCKET_BASE_API_URL;

			const socket_key =
				import.meta.env.VITE_SOCKET_API_KEY;

			const pair = getters['pair'];

			const socket = new WebSocket(serverUrl);

			socket.addEventListener('open', function open() {
				console.log('socket opened');
				commit('SET_SOCKET_CLIENT', socket);

				socket.send(JSON.stringify({
					userKey: socket_key,
					symbol: pair
				}));
			});

			socket.addEventListener('close', function () {
				console.log('socket closed');
				commit('SET_SOCKET_CLIENT', null);
			});

			socket.addEventListener('message', function ({
				data
			}) {
				try {
					let tick = JSON.parse(data);

					executeAfterOneSec(() => {
						commit('UPDATE_LAST_PRICE', tick.bid);
						commit('CALCULATE_DIIFS');
					})
				} catch (error) {}
			});

			socket.addEventListener('error', function (data) {
				console.log('error', data);
			});
		},

		disconnectSocket({
			state,
			commit,
		}) {
			console.log('disconnectSocket');
			if (state.socket) {
				state.socket.close();
				commit('SET_SOCKET_CLIENT', null)
			}
		}
	}
}