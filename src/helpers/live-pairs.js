const validPairs = [
	'USDJPY',
	'USDCHF',
	'EURUSD',
	'GBPUSD',
	'EURGBP',
	'EURJPY',
	'GBPJPY',
	'USDCAD',
	'AUDUSD',
	'EURCHF',
	'USDPLN',
	'EURPLN',
	'USDMXN',
	'EURMXN',
	'CHFJPY',
	'GBPCHF',
	'EURAUD',
	'EURCAD',
	'AUDCAD',
	'AUDJPY',
	'NZDUSD',
	'AUDNZD',
	'XAUUSD',
	'XAGUSD',
	'CADJPY',
	'USDTRY',
	'USDHKD',
	'USDSGD',
	'USDCNH',
	'EURTRY',
	'NZDJPY',
	'EURSEK',
	'GBPCAD',
	'GBPAUD',
	'AUDCHF',
	'CADCHF',
	'EURNZD',
	'GBPNZD',
	'NZDCAD',
	'NZDCHF',
	'USDZAR',
	'XPTUSD',
	'XPDUSD',
	'ZARJPY',
	'XAUEUR',
	'USDTHB',
	'USDSEK',
	'USDNOK',
	'USDHUF',
	'USDDKK',
	'SGDJPY',
	'GBPZAR',
	'EURZAR',
	'XAGEUR',
	'EURNOK',
	'EURHUF',
	'EURDKK',
	'NOKJPY',
	'NOKSEK',
	'USDRUB',
	'EURRUB',
	'TRYJPY',
	'BTCUSD',
	'BTCEUR',
	'BTCJPY',
	'ETHUSD',
	'LTCUSD',
	'DSHUSD',
	'ETCUSD',
	'ETHEUR',
	'ETHJPY',
	'LTCEUR',
	'NEOETH',
	'LTCBTC',
	'ETHBTC',
	'ETCBTC',
	'DSHBTC',
	'BTGBTC',
	'NEOBTC',
	'TRXETH',
	'BCHUSD',
	'BCHBTC',
	'BCHEUR',
	'EOSUSD',
	'EOSEUR',
	'EOSBTC',
	'BNBBTC',
]

export function isValidPairForLiveData(pair) {
	return validPairs.indexOf(pair) > -1
}