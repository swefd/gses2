const config = require('../../config/config.json')
const nodemailer = require("nodemailer");
const fs = require("fs");



class EmailsService {
  /**
   * @returns {nodemailer.Mailer} a nodemailer.Transporter
   */
  getMailTransporter() {
    return nodemailer.createTransport({
      host: config.mail.host,
      port: config.mail.port,
      auth: {
        user: config.mail.user,
        pass: config.mail.pass,
      },
    });
  }

  /**
   * @returns {Array<String>} of emails
   */
  getSubscribersEmails() {
    return fs
      .readFileSync(process.cwd() + config.db.path, "utf-8")
      .split("\n");
  }


  send(mailOptions) {
    const transporter = this.getMailTransporter();

    transporter.sendMail(mailOptions, (error, _) => {
      if (error) {
        console.log(mailOptions);
        console.log(error);
      } else {
        console.log(`Sent email to ${mailOptions.to}`);
      }
    });
  }


  sendRealEmail(email, rate){
    return new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
      "sender":{ "email":"gses2app@mail.com", "test":"Oleksandr Chornous"},
      "subject": config.mail.subject,
      "textContent": `Current BTC/UAH Rate: ${rate}`,
      'to' : [{'email': email}],
    })
  }



}

module.exports = new EmailsService();
