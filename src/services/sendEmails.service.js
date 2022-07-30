const config = require('../../config/config.json')
const nodemailer = require("nodemailer");
const SibApiV3Sdk = require('sib-api-v3-sdk');
const fs = require("fs");

SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = config.mail.API_KEY;

class EmailsService {
    /**
     * @returns {nodemailer.Mailer} a nodemailer.Transporter
     */
    getMailTransporter() {
        return nodemailer.createTransport({
            host: config.mailTrap.host,
            port: config.mailTrap.port,
            auth: {
                user: config.mailTrap.user,
                pass: config.mailTrap.pass,
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

    sendFakeEmail(mailOptions) {
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

    sendRealEmail(email, rate) {
        new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
            "sender": {"email": "gses2app@mail.com", "test": "Test Name"},
            "subject": config.mailTrap.subject,
            "textContent": `Current BTC/UAH Rate: ${rate}`,
            'to': [{'email': email}],
        })
    }
}

module.exports = new EmailsService();
