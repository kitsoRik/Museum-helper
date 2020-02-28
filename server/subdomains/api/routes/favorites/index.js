const express = require("express");
const router = express.Router();
const { sendAllData, sendError } = require("../../statics");
const dbc = require("../../dbc");

router.post("/getFavorites", (req, res) => {
    const { user: { id }} = req._payload;
    dbc.getFavorites(id)
        .then(sendAllData(res))
        .catch(sendError(res));
}); 

router.post("/saveFavorites", (req, res) => {
    const { groups } = req.body;
    
    dbc.changeFavorites(groups)
        .then(sendAllData(res))
        .catch(sendError(res));
});

router.post("/addPictureToFavorites", (req, res) => {
    const { id } = req.body;
    dbc.addFavotirePicture(id)
        .then(sendAllData(res))
        .catch(sendError(res));
});

router.post("/deletePictureFromFavorites", (req, res) => {
    const { id } = req.body;
    dbc.deleteFavotirePicture(id)
        .then(sendAllData(res))
        .catch(sendError(res));
});

router.post("/addFavoriteGroup", (req, res) => {
    const { name, description } = req.body;
    const { user: { id }} = req._payload;
    dbc.addFavotireGroup(id, name, description)
        .then(sendAllData(res))
        .catch(sendError(res));
});

router.post("/deleteFavoriteGroup", (req, res) => {
    const { id } = req.body;
    
    dbc.deleteFavotireGroup(id)
        .then(sendAllData(res))
        .catch(sendError(res));
});

module.exports = router;