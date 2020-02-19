const express = require("express");
const router = express.Router();
const utils = require("../../utils");
const mailc = require("../../mailc");
const { sendAllData, sendError } = require("../../statics");
const { customError } = require("../../statics");
const dbc = require("../../dbc");

router.post("/loginIn", (req, res) => {

    const { email, password } = req.body;
    dbc.getUserByEmailPassword(email, utils.hashPassword(password))
    .then(() => dbc.checkVerifyEmail(email))
    .then(({ id, username, email}) => {
        res.cookie("sesid", utils.createSesid(id));
        res.send({
            success: true,
            username,
            email
        });
    }).catch(sendError(res));
});

module.exports = router; 