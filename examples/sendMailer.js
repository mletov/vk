var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

app.post("/sendmail", (req, res) => {

    let transporter = nodemailer.createTransport(smtpTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "mletov",
            pass: "bard789rock"
        }
   }));

    const mailOptions = {
        from: "mletov@yandex.ru",
        to: "mletov@yandex.ru",
        subject: "subject",
        html: "message"
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.send(error);
        } else {
            res.send("Email sent: " + info.response);
        }
   });

});