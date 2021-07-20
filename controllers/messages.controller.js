const { body, validationResult } = require("express-validator");

const messagesService = require("../services/messages.service");

exports.validate = ( method ) => {
    switch ( method ) {
        case "sendMessageToEmail": {
            return [
                body("name", 'No name was entered').exists().toLowerCase().isString(),
                body("email", "You should enter a valid email").exists().isEmail().normalizeEmail(),
                body("message", "There is no message to send").exists().isString().not().notEmpty().isLength({
                    max: 250
                }).trim().escape(),
            ]
        }    
            break;
    
        default:
            break;
    }
}

exports.sendMessageToEmail = async (req, res, next) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
            .status(422)
            .json({ 
                success: false,
                data: null,
                errors: errors.array() 
            });
        }

    const emails = [
        // send notification emails to official expeditemovers email accounts
        {
            to: ['Olubowale Ade-Onojobi <adewalade@gmail.com>', 'Team team@ellopod.com'],
            from: 'noreply@expeditemoversng.com',
            templateId: 'd-fbc401c7877e467a810ceb678a220caf',
            dynamicTemplateData: {
                    "receiver": {
                    "firstName": "Team",
                    "lastName": "Support",
                    "email": "contact@expeditemoversng.com" 
                },
                    "contact": {
                    "name": req.body.name,
                    "email": req.body.email,
                    "message": req.body.message
                },
            },
        },
        // send emails to senders of website messages
        {
            to: 'Receiver Brown <adewalade@gmail.com>',  // send different emails to multiple people
            from: 'noreply@expeditemoversng.com',
            templateId: 'd-82ef6793262e4453a1690d367d8eba95',
            dynamicTemplateData: {
                "receiver": {
                    "firstName": req.body.name,
                    "lastName": req.body.lastName,
                    "email": req.body.email 
                },
            },
        },
    ]

    messagesService.sendMessageToEmail(emails, (error, results) => {

        if ( error )   {
            return res.status(400).send({
                success: false,
                data: null,
                errors: error
            })
        }

        return(
            res.status(200).send({
                success: true,
                data: results,
                errors: error
            })
        )
    })

    } catch (err) {
        return next(err);
    }
}