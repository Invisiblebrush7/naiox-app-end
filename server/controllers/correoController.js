const { request, response } = require("express");
const nodemailer = require('nodemailer');
require('dotenv').config();

const enviarCorreo = (req = request, res = response) => {
    let body = req.body;

    let config = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        auth:{
            user:process.env.GMAIL_EMAIL,
            pass:process.env.GMAIL_PASS
        }
    });

    const opciones = {
        from: body.email,
        subject: body.email + " : " + body.subject,
        to: process.env.GMAIL_EMAIL,
        text: body.message
    };

    config.sendMail(opciones, function(error, result){
        if(error) {
            return res.json({
                ok:false,msg:error
            });
        }
        return res.json({
            ok:true,
            msg:result
        })
    })
}

module.exports = { enviarCorreo }