const nodemailer = require("nodemailer");
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kitsorikgames@gmail.com',
      pass: 'MrwFdp0OuUDfe9GUFi'
    }
  });
  
  var mailOptions = {
    from: 'kitsorikgames@gmail.com',
    to: 'gamedevrostik@gmail.com',
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