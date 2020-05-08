export const API_KEY = 'bc2cb553-23cd-436a-8809-8e4f493e8158'
export const CORS = 'https://cors-anywhere.herokuapp.com/'
export const COIN_MARKET_INFO = 'https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest'

// Single currency URL with header authentication required
//export const COIN_MARKET_LISTING_LATEST_PAGING_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?aux=tags,circulating_supply&convert=USD&cryptocurrency_type=all&limit=100&sort=market_cap&sort_dir=desc&start='

//Multiple currency URL without header authentication required
export const COIN_MARKET_LISTING_LATEST_PAGING_URL = 'https://web-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?aux=tags,circulating_supply&convert=USD,BTC,ETH,XRP,BCH,LTC&cryptocurrency_type=all&limit=100&sort=market_cap&sort_dir=desc&start='

//Top 100 Common Url
export const TOP_100_COMMON_URL_STARTING = 'https://web-api.coinmarketcap.com/v1/exchange/listings/latest?aux=num_market_pairs,date_launched&convert='

//Top 100 by Adjusted Volume
export const TOP_100_BY_ADJUSTED_VOLUME = '&limit=100&sort=volume_24h_adjusted&sort_dir=desc&start='

//Top 100 by Reported Volume
export const TOP_100_BY_REPORTED_VOLUME = '&limit=100&sort=volume_24h&sort_dir=desc&start='

//ICON
export const NORMAL_ICON = 'https://s2.coinmarketcap.com/static/img/coins/32x32/'
export const ADJUSTED_ICON = 'https://s2.coinmarketcap.com/static/img/exchanges/32x32/'
export const REPORTED_ICON = 'https://s2.coinmarketcap.com/static/img/exchanges/32x32/'

//GRAPH
export const NORMAL_GRAPH = 'https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/'
export const ADJUSTED_GRAPH = 'https://s2.coinmarketcap.com/generated/sparklines/exchanges/web/7d/usd/'
export const REPORTED_GRAPH = 'https://s2.coinmarketcap.com/generated/sparklines/exchanges/web/7d/usd/'

//View All
export const VIEW_ALL ='https://web-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?convert=USD,BTC,ETH,XRP,BCH,LTC&cryptocurrency_type=all&limit=200&sort=market_cap&sort_dir=desc&start='