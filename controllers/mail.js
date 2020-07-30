const nodemailer = require("nodemailer")

async function initNodemailer(){
    const {EMAIL,PASSWORD} = process.env
    let transporter = nodemailer.createTransport({
        host:'smtp.mailtrap.io',
        port:25,
        auth:{
            user: EMAIL,
            pass: PASSWORD
        }
    })

    return transporter
}

async function verifyAccount(email,code){
    try{
        const transporter = await initNodemailer()
       await transporter.sendMail({
            from:`Krishi Kranti <krishi@gmail.com>`,
            to: email,
            subject:"Verify Account",
            text:"Verify Email",
            html: {path:'./templates/mail.html'},
        })
    }
    catch(err){
        throw new Error(`Can't Send Mail to verify Account ${err}`)
    }
}

module.exports = {
    verifyAccount
}