const { body, validationResult } = require("express-validator");

const messagesService = require("../services/messages.service");

// const { recieverNotifData , senderNotifData } = require("../data/dynamicTemplate.data");

exports.validate = ( method ) => {
    switch ( method ) {
        case "sendMessageToEmail": {
            return [
                body("name", 'No name was entered').exists().notEmpty().toLowerCase().isString(),
                body("email", "Please enter a valid email").exists().isEmail().normalizeEmail(),
                body("message", "There must be a message with length no more than 300 characters")
                .exists().isString().notEmpty().isLength({
                    max: 300
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
                to: ['Olubowale Ade-Onojobi <adewalade@gmail.com>', 'Team <team@ellopod.com>'],
                from: 'noreply@expeditemoversng.com',
                templateId: 'd-fbc401c7877e467a810ceb678a220caf',
                dynamicTemplateData: {
                        "receiver": {
                            "firstName": "Dewa",
                            "lastName": "Support",
                            "email": "adewalade@gmail.com" 
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
                to: req.body.email,  // send different emails to multiple people
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