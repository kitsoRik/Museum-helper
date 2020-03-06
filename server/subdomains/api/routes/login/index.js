const express = require("express");
const router = express.Router();
const utils = require("../../utils");
const { sendAllData, sendError } = require("../../statics");
const { loginIn, verifyEmail } = require("../user/db");

router.post("/loginIn", (req, res) => {

    const { email, password } = req.body;
    
    loginIn(email, password)
    .then(({ id, username, email }) => {
        res.cookie("sesid", utils.createSesid(id));
        res.send({
            success: true,
            username,
            email
        });
    }).catch(sendError(res));
});

router.post("/verifyEmail", (req, res) => {
    const { link } = req.body;

    verifyEmail(link)
        .then(sendAllData(res))
        .catch(sendError(res));
});

module.exports = router; 