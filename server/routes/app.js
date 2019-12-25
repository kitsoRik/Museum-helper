const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const databaseController = require("../scripts/dataBasesController");

let pictures;

router.post("/checkVersion", bodyParser.json(), (req, res) => {
     let version = req.body.version;
     res.send({version: global.currentUpdate.id});
});

router.post("/get", bodyParser.json(), (req, res) => {
     res.send({
          version: global.currentUpdate.id,
          pictures: pictures
     });
});

getPictures();

function getPictures() {
     databaseController.getPicturesForApp((data) => {
          pictures = data;
     });
}

module.exports.router = router;
module.exports.update = getPictures;