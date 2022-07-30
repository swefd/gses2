const config = require("../../config/config.json");
const SendEmailsService = require("../services/sendEmails.service");
const RateService = require("../services/rate.service");

class SendEmailsController {
  sendRateToAllSubscribers(req, res) {
    RateService.getRate()
      .then((rate) => {
        const subscribedEmails = SendEmailsService.getSubscribersEmails()
        subscribedEmails.forEach(emailAddress => {
          let mailOptions = {
            from: config.mail.from,
            to: emailAddress,
            subject: config.mail.subject,
            text: `Current BTC/UAH rate is ${rate} (Binance)`,
          };
          SendEmailsService.send(mailOptions);
        });
        const responseMessage = {
          message : "Emails sent successfully",
          emailAddress : subscribedEmails
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
