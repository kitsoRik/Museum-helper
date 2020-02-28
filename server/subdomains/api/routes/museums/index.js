const express = require("express");
const router = express.Router();
const { sendAllData, sendError } = require("../../statics");
const dbc = require("../../dbc");

router.post("/getMuseum", (req, res) => {
    const { museumId } = req.body;

    dbc.getMuseum(museumId)
        .then(sendAllData(res))
        .catch(sendError(res));
});

router.post("/getMuseums", (req, res) => {
    const { user: { id }} = req._payload;
    dbc.getMuseumsByUserId(id)
        .then(sendAllData(res))
        .catch(sendError(res));
});

router.post("/changeMuseumData", (req, res) => {
    const { museumId, changes } = req.body;

    dbc.changeMuseumData(museumId, changes)
        .then(sendAllData(res))
        .catch(sendError(res));
});

router.post("/addMuseum", (req, res) => {
    const { name, location } = req.body;
    const { user: { id }} = req._payload;
    dbc.addMuseum(id, name, location)
        .then(sendAllData(res))
        .catch(sendError(res));
});

router.post("/removeMuseum", (req, res) => {
    const { museumId } = req.body;
   
    dbc.removeMuseum(museumId)
        .then(sendAllData(res))
        .catch(sendError(res));
});

module.exports = router;