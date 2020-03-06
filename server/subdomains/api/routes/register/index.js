const express = require("express");
const router = express.Router();
const utils = require("../../utils");
const { registerUser, setVerifyLink } = require("./registerDb");
const mailc = require("../../mailc");
const { sendAllData, sendError } = require("../../statics");
const { customError } = require("../../statics");

router.post("/registerIn", (req, res) => {
    const { username, email, password, passwordConfirm } = req.body;

    const link = utils.makeLink();

    checkPasswords(password, passwordConfirm)
        .then(() => checkEmail(email))
        .then(() => registerUser(username, email, utils.hashPassword(password)))
        .then(setVerifyLink(email, link))
        .then(() => mailc.sendEmailVerify(email, link))
        .then(sendAllData(res, {link}))
        .catch(sendError(res));
});

const checkEmail = (email) => new Promise((resolve, reject) => {
    if(/\S+@\S+\.\S+/.test(email)) return resolve();
    
    return reject(customError("EMAIL_IS_NOT_VALID"));
});

const checkPasswords = (pass = "", confirm) => new Promise((resolve, reject) => {
    if(pass.length < 8) return reject(customError("PASSWORD_LENGTH_LESS", { field: 'password'}));
    if(pass !== confirm) return reject(customError("PASSWORDS_IS_NOT_IDENTICAL", { field: "confirm"}))
    resolve({});
});

module.exports = router; 