const router = require('express').Router();
const dbc = require("../../dbc");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

router.post('/app/getMuseums', (req, res) => {
    const { pattern = ""} = req.body;
    dbc.getMuseums(pattern)
        .then(museums => {   
            res.send({
                success: true,
                museums
            });
        });
});

router.post('/app/getMuseum', (req, res) => {
    const { id } = req.body;
    dbc.getMuseum(id)
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
    dbc.getReleasedPicturesByMuseumId(museumId)
        .then(p => pictures = p)
        .then(() => dbc.getReleasedPicturesInfoByMuseumId(museumId))
        .then(p => picturesInfo = p)
        .then(() => dbc.getReleasedPicturesIconsByMuseumId(museumId))
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