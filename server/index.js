const SCRIPT_ERROR = "SCRIPT_ERROR";

const express = require("express");
const app = express();

const dbc = require('./dbc');
const utils = require("./utils");

const fs = require("fs");
const sqlite = require("sqlite3").verbose();
const path = require("path");
const db = new sqlite.Database(path.resolve(__dirname, "../databases/nice.db"));
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const multer = require("multer");

const sendAllData = res => data => res.send({ success: true, ...data });
const sendError = res => (e = {}) => { 
    if(!e.error) e.error = SCRIPT_ERROR;
    res.send({ success: false, e });
};

app.use(cookieParser());
app.use(bodyParser.json());
app.use("/static/pictureIcons", express.static(path.join(__dirname, "/../icons")));

app.use(/.*/, (req, res, next) => {
    if(req.headers.origin)
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.post("/loginIn", (req, res) => {

    const { email, password } = req.body;

    setTimeout(() => {
        

    dbc.getUserByEmailPassword(email, password)
    .then(({ id, username, email}) => {
        res.cookie("sesid", createSesid(id));
        res.send({
            success: true,
            username,
            email
        });
    }).catch(({ error }) => {
        if(!error) error = SCRIPT_ERROR;
        res.send({
            success: false,
            error
        });
    });
    }, 3000);
});

app.post("/unlogin", (req, res) => {

    const { sesid } = req.cookies;

    dbc.deleteUserSession(sesid)
        .then(() => {
            res.clearCookie("sesid");
            sendAllData(res)()
        }).catch(sendError(res));
});

app.post("/registerIn", (req, res) => {

    const { username, email, password, passwordConfirm } = req.body;

    dbc.registerUser(username, email, password)
        .then(sendAllData(res))
        .catch(sendError(res));
});

app.post("/getData", (req, res) => {

    const { sesid } = req.cookies;

    dbc.getUser(sesid)
        .then(sendAllData(res))
        .catch(sendError(res));
});

app.post("/getMuseum", (req, res) => {
    const { sesid } = req.cookies;
    const { museumId } = req.body;

    dbc.getMuseum(museumId)
        .then(sendAllData(res))
        .catch(sendError(res));
});

app.post("/getMuseums", (req, res) => {
    const { sesid } = req.cookies;

    dbc.getIdBySesid(sesid)
        .then(dbc.getMuseumsByUserId)
        .then(sendAllData(res))
        .catch(sendError(res));
});

app.post("/changeMuseumData", (req, res) => {
    const { id, changes } = req.body;

    dbc.changeMuseumData(id, changes)
        .then(sendAllData(res))
        .catch(sendError(res));
});

app.post("/addMuseum", (req, res) => {
    const { sesid } = req.cookies;
    const { name, location } = req.body;

    dbc.getIdBySesid(sesid)
        .then(id => dbc.addMuseum(id, name, location))
        .then(sendAllData(res))
        .catch(sendError(res));
});

app.post("/removeMuseum", (req, res) => {
    const { sesid } = req.cookies;
    const { museumId } = req.body;
   
    dbc.removeMuseum(museumId)
        .then(sendAllData(res))
        .catch(sendError(res));
});

app.post("/newReleaseMuseum", (req, res) => {
    const { sesid  } = req.cookies;
    const { museumId } = req.body;
    
    dbc.newReleaseByMuseumId(museumId)
        .then(sendAllData(res))
        .catch(sendError(res));
});

app.post("/getPicturesData", (req, res) => {
    const { sesid } = req.cookies;
    const { searchParams: { searchText, sortedField, sortedType, museumId, pageNumber = 1, limit = 5 }} = req.body;
    dbc.getIdBySesid(sesid)
        .then(id => dbc.getPictures(museumId, searchText, sortedField, sortedType, museumId, limit, pageNumber))
        .then(sendAllData(res))
        .catch(sendError(res));
});

app.post("/getPictureData", (req, res) => {
    const { sesid } = req.cookies;
    const { id } = req.body;

    dbc.getPictureInfo(id)
        .then(sendAllData(res))
        .catch(sendError(res));
});

app.post("/savePictureData", (req, res) => {
    const { id, changes } = req.body;
    dbc.changePicture(id, changes)
        .then(sendAllData(res))
        .catch(sendError(res));
});

app.post("/savePictureInfo", (req, res) => {
    const { id, changes } = req.body;
    
    dbc.changePictureInfo(id, changes)
        .then(sendAllData(res))
        .catch(sendError(res));
});

app.post("/addPicture", (req, res) => {
    
    const { sesid } = req.cookies;
    const { museumId, name, description, qrcode } = req.body;

    dbc.addPicture(museumId, name, description, qrcode)
        .then(sendAllData(res))
        .catch(sendError(res));
});

app.post("/addIconToPicture", multer({dest:"uploads"}).single("icon"), (req, res) => {
    
    const { id } = req.body;
    
    utils.processFileToFilename(req.file)
    .then((filename) => dbc.addIconToPicture(id, filename))
    .then(sendAllData(res))
    .catch(sendError(res));
});

app.post("/deleteIconFromPicture", multer({dest:"uploads"}).single("icon"), (req, res) => {
    
    const { id } = req.body;
    
    dbc.deleteIconFromPictureById(id)
        .then(sendAllData(res))
        .catch(sendError(res));
});

app.post("/deletePicture", (req, res) => {
    const { sesid } = req.cookies;
    const { id, searchParams: { searchText, 
                                sortedField, 
                                sortedType, 
                                museumId, 
                                pageNumber, 
                                limit }} = req.body;
    dbc.deletePicture(id)
        .then(() => dbc.getIdBySesid(sesid))
        .then((userId) => dbc.getPictures(userId, searchText, sortedField, sortedType, museumId, limit, pageNumber))
        .then(sendAllData(res))
        .catch(sendError(res));
});

app.use("/addPictureInfo", (req, res) => {
    const { pictureId, title = "", description = "", language } = req.body;
    dbc.addPictureInfo(pictureId, title, description, language)
        .then(sendAllData(res))
        .catch(sendError(res));
});

app.post("/getFavorites", (req, res) => {
    const { sesid } = req.cookies;
    dbc.getIdBySesid(sesid)
        .then((id) => dbc.getFavorites(id))
        .then(sendAllData(res))
        .catch(sendError(res));
}); 

app.post("/saveFavorites", (req, res) => {
    const { sesid } = req.cookies;
    const { groups } = req.body;
    
    dbc.changeFavorites(groups)
        .then(sendAllData(res))
        .catch(sendError(res));
});

app.post("/getFavoritesGroupsName", (req, res) => { // UNUSED
    const { sesid } = req.cookies;

    dbc.getIdBySesid(sesid)
        .then(dbc.getFavoritesGroupsName)
        .then(names => {
            res.send({
                success: true,
                names
            });
        });

});

app.post("/addPictureToFavorites", (req, res) => {
    const { id } = req.body;
    
    dbc.addFavotirePicture(id)
        .then(sendAllData(res))
        .catch(sendError(res));
});

app.post("/deletePictureFromFavorites", (req, res) => {
    const { id } = req.body;
    
    dbc.deleteFavotirePicture(id)
        .then(sendAllData(res))
        .catch(sendError(res));
});

app.post("/addFavoriteGroup", (req, res) => {
    const { sesid } = req.cookies;
    const { name, description } = req.body;
    
    dbc.getIdBySesid(sesid)
        .then(id => dbc.addFavotireGroup(id, name, description))
        .then(sendAllData(res))
        .catch(sendError(res));
});

app.post("/deleteFavoriteGroup", (req, res) => {
    const { sesid } = req.cookies;
    const { id } = req.body;
    
    dbc.deleteFavotireGroup(id)
        .then(sendAllData(res))
        .catch(sendError(res));
});

const createSesid = (id) => {
    const makeid = (length) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

     const sesid = makeid(256);
     
     db.run(`INSERT INTO sesids (id, sesid)
            VALUES (?, ?)`, [id, sesid], (run, err) => {
                if(err) console.log(err);
            });

     return sesid;
}

app.post('/app/getMuseums', (req, res) => {
    const { name = ""} = req.body;
    dbc.getMuseums(name)
        .then(museums => {   
            res.send({
                success: true,
                museums
            });
        });
});

app.post('/app/getMuseum', (req, res) => {
    const { id } = req.body;
    dbc.getMuseum(id)
        .then(museum => {   
            res.send({
                success: true,
                museum
            });
        });
});

app.post('/app/getPictures', (req, res) => {
    const { museumId } = req.body;
    let pictures, picturesInfo;
    dbc.getReleasedPicturesByMuseumId(museumId)
        .then(p => pictures = p)
        .then(() => dbc.getReleasedPicturesInfoByMuseumId(museumId))
        .then(p => picturesInfo = p)
        .then(() => {
            res.send({
                success: true,
                pictures, 
                picturesInfo
            });
        });
});

app.listen(3006, () => console.log("LISTENING 3005 port..."));
