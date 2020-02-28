const { GMAIL_LOGIN, GMAIL_PASSWORD } = require("./secret");
const nodemailer = require("nodemailer");


exports.sendEmailVerify = (email, link) => {
	sendMail(
		[email],
		'Vefiry email',
		`Hello, it your link - ${link}`
	);
}

const sendMail = (to, title, text) => {
	var mailOptions = {
		from: 'Museum Helper',
		to: to,

		subject: title,
		text: text
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: GMAIL_LOGIN,
		pass: GMAIL_PASSWORD
	}
});