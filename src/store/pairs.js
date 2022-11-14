import {
	get
} from "../helpers/http";

export default {
	namespaced: true,

	state: {
		currencies: [],
		cryptos: [],
	},

	getters: {
		totalCurrencies: (state) => Object.keys(state.currencies).length,
		totalCryptos: (state) => Object.keys(state.cryptos).length,
		currencies: (state) => state.currencies,
		cryptos: (state) => state.cryptos,
	},

	mutations: {
		SET_LIST(
			state, [type, data]) {
			let list = [];

			Object.keys(data).forEach(key => {
				let item = {
					code: key,
					label: data[key]
				}
				list.push(item)
			})

			state[type] = list;
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