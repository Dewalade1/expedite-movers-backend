
// constant data for sending notification emails to official expeditemovers email accounts
exports.recieverNotifData = [
    {
        to: ['Olubowale Ade-Onojobi <adewalade@gmail.com>'],
        from: 'noreply@expeditemoversng.com',
        templateId: 'd-fbc401c7877e467a810ceb678a220caf',
        dynamicTemplateData: {
            receiver: {
                firstName: "Dewalade",
                lastName: "Support",
                email: "adewalade@gmail.com"
            },
        },
    },
    {
        to: ['Olubowale Ade-Onojobi <dewa@ellopod.com>'],
        from: 'noreply@expeditemoversng.com',
        templateId: 'd-fbc401c7877e467a810ceb678a220caf',
        dynamicTemplateData: {
            receiver: {
                firstName: "Dewalade",
                lastName: "Ellopod",
                email: "team@ellopod.com"
            },
        },
    },
    // {
    //     to: ['Support Team <contact@expeditemovers.com>']
    //     from: 'noreply@expeditemoversng.com',
    //     templateId: 'd-fbc401c7877e467a810ceb678a220caf',
    //     dynamicTemplateData: {
    //         receiver: {
    //             firstName: "Team",
    //             lastName: "Support",
    //             email: "contact@expeditemoversng.com"
    //         },
    //     },
    // },
    // {
    //     to: ['Gideon Ogudu <g.ogudu@expeditemoversng.com>']
    //     from: 'noreply@expeditemoversng.com',
    //     templateId: 'd-fbc401c7877e467a810ceb678a220caf',
    //     dynamicTemplateData: {
    //         receiver: {
    //             firstName: "Gideon",
    //             lastName: "Ogudu",
    //             email: "g.ogudu@expeditemoversng.com"
    //         },
    //     },
    // },
]

// send emails to senders of website messages
exports.senderNotifData = {
        // constant data to send to different emails to multiple people
        from: 'noreply@expeditemoversng.com',
        templateId: 'd-82ef6793262e4453a1690d367d8eba95',
    }


