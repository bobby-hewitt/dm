var nodemailer = require("nodemailer");

module.exports = function(html, user, subject){
    console.log('in send email', user)
	var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.GMAIL_ADDR,
            pass: process.env.GMAIL_PW
        }
    });

// setup e-mail data with unicode symbols
    var mailOptions = {
        from: "QVentures <bobbystestaddr@gmail.com>", // sender address
        
        // to:'bobbyhewitt@hotmail.co.uk',
        bcc: user.recepients,
        subject: subject, // Subject line // plaintext body
        html: html // html body
    }

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response);
        }
    });

}