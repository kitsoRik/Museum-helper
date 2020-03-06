const express = require("express");
const router = express.Router();
const { sendAllData, sendError } = require("../../statics");
const { addFavoritePicture, deleteFavoritePictureByPictureId, getFavorites, changeFavorites, addFavotireGroup, deleteFavotireGroup } = require("./db");


router.post("/getFavorites", (req, res) => {
    const { user: { id }} = req._payload;
    getFavorites(id)
        .then(groups => ({ groups }))
        .then(sendAllData(res))
        .catch(sendError(res));
}); 

router.post("/saveFavorites", (req, res) => {
    const { groups } = req.body;
    
    changeFavorites(groups)
        .then(sendAllData(res))
        .catch(sendError(res));
});

router.post("/addPictureToFavorites", (req, res) => {
    const { id } = req.body;
    addFavoritePicture(id)
        .then(sendAllData(res))
        .catch(sendError(res));
});

router.post("/deletePictureFromFavorites", (req, res) => {
    const { id } = req.body;
    deleteFavoritePictureByPictureId(id)
        .then(sendAllData(res))
        .catch(sendError(res));
});

router.post("/addFavoriteGroup", (req, res) => {
    const { name, description } = req.body;
    const { user: { id }} = req._payload;
    addFavotireGroup(id, name, description)
        .then(group => ({ group }))
        .then(sendAllData(res))
        .catch(sendError(res));
});

router.post("/deleteFavoriteGroup", (req, res) => {
    const { id } = req.body;
    
    deleteFavotireGroup(id)
        .then(sendAllData(res))
        .catch(sendError(res));
});

module.exports = router;