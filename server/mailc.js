const nodemailer = require("nodemailer");
const { GMAIL_LOGIN, GMAIL_PASSWORD } = require("./secret");
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_LOGIN,
      pass: GMAIL_PASSWORD
    }
  });
  
  var mailOptions = {
    from: 'Museum Helper',
    to: 'EMAIL',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });