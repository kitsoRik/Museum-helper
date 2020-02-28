const express = require("express");
const router = express.Router();
const utils = require("../../utils");
const mailc = require("../../mailc");
const { sendAllData, sendError } = require("../../statics");
const { customError } = require("../../statics");
const dbc = require("../../dbc");
const multer = require("multer");

router.post("/getPictureData", (req, res) => {
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

router.post("/savePictureData", (req, res) => {
    const { id, changes } = req.body;
    dbc.changePicture(id, changes)
        .then(sendAllData(res))
        .catch(sendError(res));
});

router.post("/addIconToPicture", multer({dest:"uploads"}).single("icon"), (req, res) => {
    
    const { id } = req.body;
    
    utils.processFileToFilename(req.file)
    .then((filename) => dbc.addIconToPicture(id, filename))
    .then(sendAllData(res))
    .catch(sendError(res));
});

router.post("/deleteIconFromPicture", multer({dest:"uploads"}).single("icon"), (req, res) => {
    
    const { id } = req.body;
    
    dbc.deleteIconFromPictureById(id)
        .then(sendAllData(res))
        .catch(sendError(res));
});

module.exports = router;