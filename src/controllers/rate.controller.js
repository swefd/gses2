const RateService = require('../services/rate.service')

class RateController {

    getRate(req, res) {
        RateService.getRate().then((result) => {
            res.send(result)
        }).catch((err) => {
            console.error(toString(err))
            res.status(409)
            res.send(err)
        });

    }
}

module.exports = new RateController()
