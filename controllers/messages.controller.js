const { body, validationResult } = require("express-validator");

const messagesService = require("../services/messages.service");

const { recieverNotifData , senderNotifData } = require("../data/dynamicTemplate.data");

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

exports.addSenderToContactlist = async (req, res, next ) => {

    try{
        
        const sender = [
            {
                name: req.body.name,
                email: req.body.email
            }
        ]

        const request = {
            body: sender,
            method: 'POST',
            url: '/v3/contactdb/lists/all_contacts/'
        };
        
        messagesService.addSenderToContactlist( request , (error, result) => {
            return (
                res.status(200).json({
                    success: true,
                    data: results,
                    error: error
                })
            )
        })
    } catch (err) {
        return next(err)
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

        for (let i = 0; i < recieverNotifData.length; i++) {
            recieverNotifData[i].dynamicTemplateData.contact = {
                name: req.body.name,
                email: req.body.email,
                message: req.body.message
            }
        }

        senderNotifData.dynamicTemplateData = {
            sender: {
                name: req.body.name,
                email: req.body.email
            }
        }

        senderNotifData.to = `${req.body.name} <${req.body.email}>`     

        const emails = [...recieverNotifData, senderNotifData]

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
