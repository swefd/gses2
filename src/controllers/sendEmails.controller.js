const config = require("../../config/config.json");
const SendEmailsService = require("../services/sendEmails.service");
const SubscribeService = require("../services/subscribe.service");
const RateService = require("../services/rate.service");

class SendEmailsController {
  async sendRateToAllSubscribers(req, res) {
    await RateService.getRate(config.app.coinPair)
      .then(async rate => {

          const emails = await SubscribeService.readEmailsFromFile()

          console.log(emails)


          subscribedEmails.forEach((emailAddress) => {
              let mailOptions = {
                  from: config.mail.from,
                  to: emailAddress,
                  subject: config.mail.subject.replace("$COIN_PAIR$", config.app.coinPair),
                  text: config.mail.content.replace("$COIN_PAIR$", config.app.coinPair).replace("$RATE$", rate),
              };
              SendEmailsService.send(mailOptions);
          });
          const responseMessage = {
              message: "Emails sent successfully",
              emailAddress: subscribedEmails
          }
          res.status(200).type('json').send(responseMessage);
      })
      .catch((err) => {
          res.status(503).send(err)
          console.error(err)
      });
  }
}

module.exports = new SendEmailsController();
