const sendgridMail = require('@sendgrid/mail')

exports.sendMessageToEmail = (emails, callback) => {

    sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)

    sendgridMail.sendMultiple(emails).then(() => {
        console.log(`message Sent`)
        return callback(null, `message sent successfully`)
    })
    .catch((error) => {
        if (error.response) {
            const {message, code, response} = error;
            const {headers, body} = response;
            console.error(body);
            return callback(body)
        }

        return callback(error)
    })
}