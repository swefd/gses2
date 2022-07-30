//const COIN_PAIR = require("../../config/config.json").app.coinPair
const axios = require('axios')

class RateService {

    async getRate(coinPair = 'BTCUAH') {
        await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${coinPair}`).then(res => {
            console.log(Math.round(res.data["price"]).toString())
            return Math.round(res.data["price"]).toString()
        })
    }
}

module.exports = new RateService()