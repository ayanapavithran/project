const nodemailer = require('nodemailer');
const config = require('./config.json');
const mailConfig = config['mail-config'];
exports.sendMail = async (to, subject, text, html) => {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = undefined;
    // if (mailConfig.enableEtherealEmail) 
    //     testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: mailConfig.host,
        port: mailConfig.port,
        secure: mailConfig.secure, 
        auth: {
            user: mailConfig.user, 
            pass: mailConfig.password, 
            // user: mailConfig.enableEtherealEmail ? testAccount && testAccount.user: mailConfig.user, 
            // pass: mailConfig.enableEtherealEmail ? testAccount && testAccount.pass: mailConfig.password,
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'tom.gislason@ethereal.email', // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    console.log("Returning details", info, nodemailer.getTestMessageUrl(info));
    return {
        info,
        url: nodemailer.getTestMessageUrl(info)
    };

};

exports.generateAuthKey = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.getMailTemplate = (email, insertId, auth) => {
   
    return `<div><h1>Reset Your Password</h1><br/><p>Use the below link to Reset Your passoword.</p>
            <p>Note: This link will be only active for 15 minutes, and will only work for 1 time.</p>
            <p>For resetting password click this link : <a target="_blank" href="${config.resetPwdLink}a=${auth}&u=${insertId}">LINK</a></p></div>`;
}

exports.getRandomNumber = (min, max) => {
    while(true) {
        const value = Math.floor((Math.random() * max) + min);
        if(min <= value && value <= max)
            return value; 
    }
}

exports.addMinutesToDate = (date, minutes) => {
    return new Date(date.getTime() + minutes * 60000);
}

exports.compareDates = (d1, d2) => {
    if (d1.getTime() < d2.getTime()){
        console.log(d1, " < ", d2);
        return -1;
    }
    else if (d1.getTime() > d2.getTime()){
        console.log(d1, " > ", d2);
        return 1;
    }
    else {
        console.log(d1, " = ", d2);
        return 0;
    }
}