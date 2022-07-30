const RateService = require('../services/rate.service')

class RateController {

    async getRate(req, res) {
        await RateService.getRate().then(result => {
            //console.log(result)
            res.send(result)
        }).catch(err => {
            console.error(toString(err))
            res.status(409).send(err)
        });
    }
}

module.exports = new RateController()
