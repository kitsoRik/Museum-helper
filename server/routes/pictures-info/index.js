const express = require("express");
const router = express.Router();
const utils = require("../../utils");
const mailc = require("../../mailc");
const { sendAllData, sendError } = require("../../statics");
const { customError } = require("../../statics");
const dbc = require("../../dbc");

router.post("/getPictureData", (req, res) => {
    const { sesid } = req.cookies;
    const { id } = req.body;

    dbc.getPictureInfo(id)
        .then(sendAllData(res))
        .catch(sendError(res));
});

router.post("/savePictureInfo", (req, res) => {
    const { id, changes } = req.body;
    
    dbc.changePictureInfo(id, changes)
        .then(sendAllData(res))
        .catch(sendError(res));
});

router.post("/addPictureInfo", (req, res) => {
    const { pictureId, title = "", description = "", language } = req.body;
    dbc.addPictureInfo(pictureId, title, description, language)
        .then(sendAllData(res))
        .catch(sendError(res));
});

router.post("/removePictureInfo", (req, res) => {
    const { id } = req.body;
    dbc.removePictureInfo(id)
        .then(sendAllData(res))
        .catch(sendError(res));
});

module.exports = router;