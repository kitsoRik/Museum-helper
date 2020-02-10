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
});

app.post("/unlogin", (req, res) => {

    const { sesid } = req.cookies;

    dbc.deleteUserSession(sesid)
        .then(() => {
            res.clearCookie("sesid");
            res.send({
                success: true,
            });
        }).catch(({ error }) => {
            if(!error) error = SCRIPT_ERROR;
            res.send({
                success: false,
                error
            })
        });
});

app.post("/registerIn", (req, res) => {

    const { username, email, password, passwordConfirm } = req.body;

    dbc.registerUser(username, email, password)
        .then(() => {
            res.send({
                success: true
            });
        }).catch(({ error }) => {
            if(!error) error = SCRIPT_ERROR;
            res.send({
                success: false,
                error
            })
        });
});

app.post("/getData", (req, res) => {

    const { sesid } = req.cookies;

    dbc.getUser(sesid)
        .then(({ username, email }) => {
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
});

app.post("/getPicturesData", (req, res) => {
    const { sesid } = req.cookies;
    const { searchParams: { searchText, sortedField, sortedType }} = req.body;
    dbc.getIdBySesid(sesid)
        .then(id => dbc.getPictures(id, searchText, sortedField, sortedType))
        .then(pictures => {
            res.send({
                success: true,
                pictures
            });
        })
        .catch(({ error }) => {
            if(!error) error = SCRIPT_ERROR;
            res.send({
                success: false,
                error
            })
        });
});

app.post("/getPictureData", (req, res) => {
    const { sesid } = req.cookies;
    const { id } = req.body;

    dbc.getPictureInfo(id)
        .then(({ picture, pictureInfo }) => {
            res.send({
                success: true,
                picture,
                pictureInfo
            });
        }).catch(({ error }) => {
            if(!error) error = SCRIPT_ERROR;
            res.send({
                success: false,
                error
            });
        });
});

app.post("/savePictureData", (req, res) => {
    const { id, changes } = req.body;
    dbc.changePicture(id, changes)
        .then(changes => {
            res.send({
                success: true,
                changes
            });
        }).catch(({ error }) => {
            if(!error) error = SCRIPT_ERROR;
            res.send({
                success: false,
                error
            });
        });
});

app.post("/savePictureInfo", (req, res) => {
    const { id, changes } = req.body;
    dbc.changePictureInfo(id, changes)
        .then(changes => {
            res.send({
                success: true,
                changes
            });
        }).catch(({ error }) => {
            if(!error) error = SCRIPT_ERROR;
            res.send({
                success: false,
                error
            });
        });
});

app.post("/addPicture", (req, res) => {
    
    const { sesid } = req.cookies;
    const { name, description, qrcode } = req.body;

    dbc.getIdBySesid(sesid)
        .then(userId => {
                dbc.addPicture(userId, name, description, qrcode)
                .then(picture => {
                    res.send({
                        success: true,
                        picture
                    });
                });
        }).catch(({ error }) => {
            if(!error) error = SCRIPT_ERROR;
            res.send({
                success: false,
                error
            })
        });
});

app.post("/addIconToPicture", multer({dest:"uploads"}).single("icon"), (req, res) => {
    
    const { id } = req.body;
    
    utils.processFileToFilename(req.file)
    .then((filename) => dbc.addIconToPicture(id, filename))
    .then((addedIcon) => {
        res.send({
            success: true,
            addedIcon
        })
    })
    .catch(({ error }) => {
        if(!error) error = SCRIPT_ERROR;
        res.send({
            success: false,
            error
        });
    });
});

app.post("/deleteIconFromPicture", multer({dest:"uploads"}).single("icon"), (req, res) => {
    
    const { id } = req.body;
    
    dbc.deleteIconFromPictureById(id)
        .then((id) => {
            res.send({
                success: true,
                id
            });
        }).catch(({ error }) => {
            if(!error) error = SCRIPT_ERROR;
            res.send({
                success: false,
                error
            });
        });
});

app.use("/deletePicture", (req, res) => {
    const { id } = req.body;
    dbc.deletePicture(id)
        .then(() => {
            res.send({
                success: true
            });
        }).catch(({ error }) => {
            if(!error) error = SCRIPT_ERROR;
            res.send({
                success: false,
                error
            });
        });
});

app.use("/addPictureInfo", (req, res) => {
    const { pictureId, title, description, language } = req.body;
    dbc.addPictureInfo(pictureId, title, description, language)
        .then(addedPictureInfo => {
            res.send({
                success: true,
                addedPictureInfo
            });
        }).catch(({ error }) => {
            if(!error) error = SCRIPT_ERROR;
            res.send({
                success: false,
                error
            });
        });
});

app.post("/getFavorites", (req, res) => {
    const { sesid } = req.cookies;
    dbc.getIdBySesid(sesid)
        .then((id) => {
            dbc.getFavorites(id)
                .then((groups) => {
                    res.send({ 
                        success: true,
                        groups
                    });
                });
        })
        .catch(({ error }) => {
            if(!error) error = SCRIPT_ERROR;
            res.send({
                success: false,
                error
            });
        })
}); 

app.post("/saveFavorites", (req, res) => {
    const { sesid } = req.cookies;
    const { groups } = req.body;
    
    dbc.changeFavorites(groups)
        .then(() => {
            res.send({
                success: true
            })
        }).catch(({ error }) => {
            if(!error) error = SCRIPT_ERROR;
            res.send({
                success: false,
                error
            });
        });
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
        .then(() => {
            res.send({
                success: true
            });
        }).catch(({ error }) => {
            res.send({
                success: false,
                error
            });
        });
});

app.post("/deletePictureFromFavorites", (req, res) => {
    const { id } = req.body;
    
    dbc.deleteFavotirePicture(id)
        .then(() => {
            res.send({
                success: true
            });
        }).catch(({ error }) => {
            res.send({
                success: false,
                error
            });
        });
});

app.post("/addFavoriteGroup", (req, res) => {
    const { sesid } = req.cookies;
    const { name, description } = req.body;
    
    dbc.getIdBySesid(sesid)
        .then(id => dbc.addFavotireGroup(id, name, description))
        .then(addedGroup => {
            res.send({
                success: true,
                addedGroup
            })
        }).catch(({ error }) => {
            res.send({
                success: false,
                error
            });
        });
});

app.post("/deleteFavoriteGroup", (req, res) => {
    const { sesid } = req.cookies;
    const { id } = req.body;
    
    dbc.deleteFavotireGroup(id)
        .then(() => {
            res.send({
                success: true
            })
        }).catch(({ error }) => {
            res.send({
                success: false,
                error
            });
        });
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



app.listen(3006, () => console.log("LISTENING 3005 port..."));
