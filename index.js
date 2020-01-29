const nodemailer = require("nodemailer");
const chalk = require('chalk')

function mailerInitialise(options) {

    if (options) {

        if (options.host === undefined) {
            options.host = 'smtp.gmail.com'
        }
        if (options.port === undefined) {
            options.port = 587
        }
        if (options.secure === undefined) {
            options.secure = false
        }

        if (options.user === undefined) {
            console.log(chalk.red("user Field is Required"));
            return;
        }
        if (options.pass === undefined) {
            console.log(chalk.red("password Field is Required"));
            return
        }

        return nodemailer.createTransport({
            host: options.host,
            port: options.port,
            secure: options.secure,
            auth: {
                user: options.user,
                pass: options.pass
            }
        });


    }
}

async function sendMail(transporter, mail) {

    if (mail.from === undefined) {
        console.log(chalk.red('Mail Cannot be send. From is required'));
        return;
        
    }
    if (mail.to === undefined) {
        mail.to = ''
    } else {
        mail.to = mail.to.join(',')
    }
    if (mail.subject === undefined) {
        mail.subject = ''
    }
    if (mail.text === undefined) {
        mail.text = ''
    }
    if(mail.html === undefined){
        mail.html = ''
    }

    try {
        // send mail with provided transport object
        let info = await transporter.sendMail({
            from: mail.from, // sender address
            to: mail.to, // list of receivers
            subject: mail.subject, // Subject line
            text: mail.text, // plain text body
            html: mail.html // html body
        });

        console.log(chalk.greenBright(), info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    } catch (error) {
        console.log(chalk.red(error));
        
    }
    
}

module.exports = {
    mailerInitialise : mailerInitialise,
    sendMail : sendMail
}