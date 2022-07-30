const fs = require("fs");
const config = require("../../config/config.json");

class SubscribeService {
    readEmailsFromFile(path, callback) {
        // return fs.promises.readFile(process.cwd() + config.db.path,
        //     {encoding: "utf8",}
        // )

        // for async/await
        const strEmails = fs.readFileSync(process.cwd() + config.db.path, {encoding : "utf-8"})
        return strEmails.split(/\r?\n/).filter(element => element);
    }

    validateEmail(path, callback) {
        return fs.promises.readFile(process.cwd() + config.db.path,
            {encoding: "utf8",}
        );
        // for async/await
        //return fs.readFileSync(process.cwd() + config.db.path, {encoding : "utf-8"});
    }

    addEmailToFile(email) {
        return fs.promises.appendFile(process.cwd() + config.db.path,
            "\n" + email,
            {encoding: "utf8"}
        );
        // for async/await
        //return fs.appendFileSync(process.cwd() + config.db.path,"\n" + email, {encoding : "utf-8"})
    }


    /**
     * JSON not implemented
     * In this case, it is easier to save the data in a txt file :)
     */

}

module.exports = new SubscribeService();
