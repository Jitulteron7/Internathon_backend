const  fast2sms = require('fast-two-sms');

class MessageService {
    constructor() {}

    async sendMessage(mobileNumbers,message) {
        try {
            let response = await fast2sms.sendMessage({ authorization: process.env.API_KEY_MSG, message: message, numbers: mobileNumbers});
            return response;
        } catch (err) {
            console.log(err, 'err message');
        }
    }
}

module.exports=MessageService;
