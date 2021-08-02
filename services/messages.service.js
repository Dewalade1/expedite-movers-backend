const sendgridMail = require('@sendgrid/mail')
const sendgridClient = require('@sendgrid/client')

exports.addSenderToContactlist = (request, callback) => {

    sendgridClient.setApiKey(process.env.SENDGRID_API_KEY)

    sendgridClient.request(request)
        .then(([result, body]) => {
            console.log(result.statusCode);
            console.log(result.body);

            return callback(null, result)
        })
    }

exports.sendMessageToEmail = (emails, callback) => {

    sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)

    sendgridMail.sendMultiple(emails).then(() => {
        return callback(null, `messages sent successfully`)
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