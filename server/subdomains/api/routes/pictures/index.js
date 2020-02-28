const express = require("express");
const router = express.Router();
const { sendAllData, sendError } = require("../../statics");
const dbc = require("../../dbc");

router.post("/getPicturesData", (req, res) => {
    const { searchParams: { searchText, 
        sortedField, 
        sortedType, 
        museumId, 
        updateId,
        pageNumber = 1, 
        limit = 5 }} = req.body;

        dbc.getPictures(museumId, searchText, sortedField, sortedType, museumId, updateId, limit, pageNumber)
        .then(sendAllData(res))
        .catch(sendError(res));
});

router.post("/deletePicture", (req, res) => {
    const { id, searchParams: { searchText, 
                                sortedField, 
                                sortedType, 
                                museumId, 
                                pageNumber, 
                                limit }} = req.body;
    const userId = req._payload.user.id;
    dbc.deletePicture(id)
        .then(() => dbc.getPictures(userId, searchText, sortedField, sortedType, museumId, limit, pageNumber))
        .then(sendAllData(res))
        .catch(sendError(res));
});

router.post("/addPicture", (req, res) => {
    const { museumId, name, description, qrcode } = req.body;

    dbc.addPicture(museumId, name, description, qrcode)
        .then(sendAllData(res))
        .catch(sendError(res));
});

module.exports = router;