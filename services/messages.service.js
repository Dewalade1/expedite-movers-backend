const sendgridMail = require('@sendgrid/mail')

exports.sendMessageToEmail = (emails, callback) => {

    sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)

    sendgridMail.sendMultiple(emails).then(() => {
        return callback(null, `message sent successfully`)
    })
    .catch((error) => {
        if (error.response) {
            const {message, code, response} = error;
            const {headers, body} = response;
            const error = body

            console.error(error);
            
            return callback(error)
        }

        console.error(error);
        return callback(error)
    })
}