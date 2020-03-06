const router = require('express').Router();
const bodyParser = require("body-parser");
const { getMuseumsByNamePattern, getMuseumById } = require('../museums/db');
const { getReleasedPicturesByMuseumId } = require('../pictures/db');
const { getReleasedPicturesInfoByMuseumId, getReleasedPicturesIconsByMuseumId } = require('../picture/db');

router.use(bodyParser.json());

router.post('/app/getMuseums', (req, res) => {
    const { pattern = ""} = req.body;
    getMuseumsByNamePattern(pattern)
        .then(museums => {   
            res.send({
                success: true,
                museums
            });
        });
});

router.post('/app/getMuseum', (req, res) => {
    const { id } = req.body;
    require('../museums/db').getMuseumById(id)
        .then(museum => {   
            res.send({
                success: true,
                museum
            });
        });
});

router.post('/app/getPictures', (req, res) => {
    const { museumId } = req.body;
    let pictures, picturesInfo, picturesIcons;
    getReleasedPicturesByMuseumId(museumId)
        .then(p => pictures = p)
        .then(() => getReleasedPicturesInfoByMuseumId(museumId))
        .then(p => picturesInfo = p)
        .then(() => getReleasedPicturesIconsByMuseumId(museumId))
        .then(p => picturesIcons = p)
        .then(() => {
            res.send({
                success: true,
                pictures, 
                picturesInfo,
                picturesIcons
            });
        });
});

module.exports = router;