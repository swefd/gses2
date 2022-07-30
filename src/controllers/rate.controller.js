const RateService = require('../services/rate.service')
const config = require('../../config/config.json')

class RateController {

    async getRate(req, res) {
        await RateService.getRate(config.app.coinPair).then(result => {
            console.log(result)
            res.send(result)
        }).catch(err => {
            console.error(toString(err))
            res.status(409).send(err)
        });
    }
}

module.exports = new RateController()
