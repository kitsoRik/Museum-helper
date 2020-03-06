const express = require("express");
const router = express.Router();
const { sendAllData, sendError } = require("../../statics");
const { hashPassword } = require("../../utils");
const { getUser, checkPassword, changeUserData, deleteSesid } = require("./db");

router.post("/changeUserData", (req, res) => {
    const { password, changes } = req.body;
    const { user: { id }} = req._payload;
        checkPassword(id, hashPassword(password))
        .then(() => changeUserData(id, changes))
        .then(sendAllData(res))
        .catch(sendError(res))
});

router.post("/unlogin", (req, res) => {
    const { sesid } = req.cookies;
    deleteSesid(sesid)
        .then(() => {
            res.clearCookie("sesid");
            sendAllData(res)()
        }).catch(sendError(res));
});

router.post("/getData", (req, res) => {
    const { user: { id }} = req._payload;
    getUser(id)
        .then(sendAllData(res))
        .catch(sendError(res));
});

module.exports = router;