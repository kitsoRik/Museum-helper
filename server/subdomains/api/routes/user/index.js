const express = require("express");
const router = express.Router();
const { sendAllData, sendError } = require("../../statics");
const dbc = require("../../dbc");

router.use("/", (req, res, next) => {
    console.log(req.baseUrl);
    next();
})

router.post("/changeUserData", (req, res) => {
    const { password, changes } = req.body;
    const { user: { id }} = req._payload;
        dbc.checkPasswordById(id, utils.hashPassword(password))
        .then(() => dbc.changeUserData(id, changes))
        .then(sendAllData(res))
        .catch(sendError(res))
});

router.post("/unlogin", (req, res) => {
    const { sesid } = req.cookies;
    dbc.deleteUserSession(sesid)
        .then(() => {
            res.clearCookie("sesid");
            sendAllData(res)()
        }).catch(sendError(res));
});

router.post("/getData", (req, res) => {
    const { user: { id }} = req._payload;
    dbc.getUser(id)
        .then(sendAllData(res))
        .catch(sendError(res));
});

module.exports = router;