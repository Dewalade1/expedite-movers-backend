
// constant data for sending notification emails to official expeditemovers email accounts
exports.recieverNotifData = [
    {
        to: ['Support Team <adewalade@gmail.com>'],
        from: 'noreply@expeditemoversng.com',
        templateId: 'd-fbc401c7877e467a810ceb678a220caf',
        dynamicTemplateData: {
            receiver: {
                firstName: "Team",
                lastName: "Support",
                email: "adewalade@gmail.com"
            },
        },
    },
    {
        to: ['Gideon Ogudu <team@ellopod.com>'],
        from: 'noreply@expeditemoversng.com',
        templateId: 'd-fbc401c7877e467a810ceb678a220caf',
        dynamicTemplateData: {
            receiver: {
                firstName: "Gideon",
                lastName: "Ogudu",
                email: "team@ellopod.com"
            },
        },
    },
]

// send emails to senders of website messages
exports.senderNotifData = {
        // constant data to send to different emails to multiple people
        from: 'noreply@expeditemoversng.com',
        templateId: 'd-82ef6793262e4453a1690d367d8eba95',
    }


