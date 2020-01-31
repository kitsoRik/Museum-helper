const express = require("express");
const cookieParser = require("cookie-parser")
const databaseController = require("../scripts/dataBasesController");
const router = express.Router();

const multer = require("multer");

const multerStorage = multer.diskStorage({
     destination: (req, file, callback) => {
          callback(null, "../icons");
     },
     filename: (req, file, callback) => {
          callback(null, "MyFile_" + file.originalname);
     }
});

let upload = multer({storage: multerStorage});


router.use(cookieParser());

router.get("/dataAboutMe", (req, res) => {
     console.log(req.cookies);
     let cookie = "name=Rostik;password=Tawer";
     //res.cookie("user", "qweqweqwe", {maxAge: 3700, httpOnly: true})
     res.send("S");
});

router.post("/loginin", (req, res) => {
     res.setHeader("Set-Cookie", "qwe=qweqwe");
     let email = req.body.email, password = req.body.password;
     if(email == "Rostik@w" && password == "TawerTawer")
          res.send({
               name: "Rostyslav",
               surname: "Pidburachynskyi",
               year: 19
          });
     else res.send({
          error: "Unknown user"
     });
});

router.post("/addPicture", upload.single("icon"), (req, res) => {
     let picture = req.body;
     let file = req.file;
     picture.iconPath = file ? file.filename : null;
     databaseController.addPicture(picture, (addedPicture) => {
          res.send(addedPicture);
          databaseController.save();
     });
});

router.post("/deletePicture", (req, res) => {
     let id = req.body.id;
     databaseController.deletePicture(id, (result) => {
          res.send({ ress: result });
          databaseController.save();
     });
});

router.post("/getPictures", (req, res) => {
     databaseController.getPictures((pictures) => {
          res.send(JSON.stringify(pictures));
     });
});

router.post("/getPictureInfo", (req, res) => {
     let id = req.body.id;
     databaseController.getPictureInfo(id, (picture) => {
          res.send(picture);
     });
});

router.post("/savePicture", (req, res) => {
     databaseController.savePicture(req.body.picture, req.body.pictureInfo, () => {
          res.end();
          databaseController.save();
     });
});

router.post("/uploadIcon", upload.single("file"), (req, res, next) => {
     const file = req.file;
     let options = JSON.parse(req.body.options);
     
     databaseController.uploadIcon(options.id, file.filename,  (path) => {
          res.send({result: true, path: path}); 
          databaseController.save();
     });
});

router.post("/deleteIcon", (req, res, next) => {
     let id = req.body.id;
     databaseController.deleteIcon(id,  (result) => {
          res.send({result: result}); 
          databaseController.save();
     });
});

module.exports = router;