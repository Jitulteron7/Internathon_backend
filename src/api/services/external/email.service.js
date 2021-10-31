const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const CLIENT_ID = '182155992911-hv53tpsjj7a8d2edu13n0g6criu6r1th.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04wQ2LgXhQO0fCgYIARAAGAQSNwF-L9Irl3kAQIdER5iOOlVjqnG-iFnsRpfi5K0wRFqsqo89Dpve8fyhjBeTCkdnu9pmtD6PmgA';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLEINT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
var accessToken
var transpoter

(async()=>{
     accessToken = await oAuth2Client.getAccessToken();

     transpoter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'emailserviceramanujan@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLEINT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
        }
    }); 
})



class MailService {
    constructor() {}

    async sendForgotPasswordMail(user, token) {
        const resetLink = `${process.env.FRONTEND_DOMAIN_NAME ? process.env.FRONTEND_DOMAIN_NAME : 'http://localhost:3000'}/resetpassword/${user._id}/${token}`;
        const mailOptions = {
            from: 'emailserviceramanujan@gmail.com',
            to: user.email,
            subject: 'Password Email Link',
            html: `Click here to reset your password ${resetLink}`
        };

        let data = await transpoter.sendMail(mailOptions);
        console.log(data, 'email data');
    }


    async inviteEmail(user) {
        const resetLink = `${process.env.FRONTEND_DOMAIN_NAME ? process.env.FRONTEND_DOMAIN_NAME : 'http://localhost:3000'}/resetpassword/${user._id}/${token}`;
        const mailOptions = {
            from: 'jitulteron9@gmail.com',
            to: user.email,
            subject: `Invitation Link By Let's go Dutch `,
            html: `Click here to join the group ${resetLink}`
        };

        let data = await transpoter.sendMail(mailOptions);
    }
    async accountCreated(user) {
        
        const mailOptions = {
            from: 'jitulteron9@gmail.com',
            to: user.email,
            subject: `Let's go Dutch Account Created`,
            html: `Your Let's go Dutch is created`
        };

        let data = await transpoter.sendMail(mailOptions);
        
        return data;
    }

    async dueEmail(user, token) {
        const resetLink = `${process.env.FRONTEND_DOMAIN_NAME ? process.env.FRONTEND_DOMAIN_NAME : 'http://localhost:3000'}/resetpassword/${user._id}/${token}`;
        const mailOptions = {
            from: 'emailserviceramanujan@gmail.com',
            to: user.email,
            subject: 'Password Email Link',
            html: `Click here to reset your password ${resetLink}`
        };

        let data = await transpoter.sendMail(mailOptions);
        console.log(data, 'email data');
    }
}

module.exports = MailService;
