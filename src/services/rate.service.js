const https = require('https');
const COIN_PAIR = require("../../config/config.json").app.coinPair

class RateService {
    getRate() {
        return new Promise((resolve, reject) => {
            https.get(`https://api.binance.com/api/v3/ticker/price?symbol=${COIN_PAIR}`, (binanceResponse) => {
                    let data = "";

                    binanceResponse.on("data", (chunk) => {
                        data += chunk;
                    });

                    binanceResponse.on("end", () => {
                        resolve(Math.round(JSON.parse(data)["price"]).toString());
                    });
                }
            )
                .on("error", (err) => {
                    reject(err)
                });
        })
    }


}

module.exports = new RateService()