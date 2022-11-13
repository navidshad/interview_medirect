import {
	get
} from "../helpers/http";

export default {
	namespaced: true,

	state: {
		currencies: {},
		cryptos: {},
	},

	getters: {
		totalCurrencies: (state) => Object.keys(state.currencies).keys.length,
		totalCryptos: (state) => Object.keys(state.cryptos).keys.length,
	},

	mutations: {
		SET_LIST({
			state
		}, [type, data]) {
			state[type] = data;
		}
	},

	actions: {
		fetchCurrencies({
			commit
		}) {
			return get('/live_currencies_list')
				.then(({
					available_currencies
				}) => {
					commit('SET_LIST', ['currencies', available_currencies])
				})
		},

		fetchCryptos({
			commit
		}) {
			return get('/live_crypto_list')
				.then(({
					available_currencies
				}) => {
					commit('SET_LIST', ['cryptos', available_currencies])
				})
		}
	},
}