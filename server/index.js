const express = require("express");
const app = express();

const path = require("path");
const fs = require("fs");
const sqlite = require("sqlite3").verbose();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const multer = require("multer");

const db = new sqlite.Database(path.resolve(__dirname, "../databases/nice.db"));

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

    db.get(`SELECT * FROM users u
            WHERE u.email=? AND u.password=? 
            LIMIT 1`, [
            email,
            password
            ], (err, user) => {
        if (err || !user) {
            res.send({
                success: false,
                error: "UNKNOWN_DATA"
            });
            return;
        }
        res.cookie("sesid", createSesid(user.id));
        res.send({
            success: true,
            username: user.username,
            email: user.email
        });
    });
});

app.post("/unlogin", (req, res) => {

    res.clearCookie("sesid");

    res.send({
        success: true
    });
});

app.post("/registerIn", (req, res) => {

    const { username, email, password, passwordConfirm } = req.body;

    db.run(`INSERT INTO users (username, email, password) 
            VALUES ($username, $email, $password)`, {
        $username: username,
        $email: email,
        $password: password
    }, (runresult, err) => {
        if (err) {
            res.send({
                success: false,
                error: "Est takoi"
            });
            return;
        }
        res.send({
            success: true
        });
    });
});

app.post("/getData", (req, res) => {

    const { sesid } = req.cookies;

    db.get(`SELECT * FROM users u 
            WHERE u.id=(
                SELECT id FROM sesids s
                WHERE s.sesid=?
                LIMIT 1
            )`, [sesid], (err, user) => {
                if(err) {
                    return console.log(err);
                }
                if(!user) {
                    return res.send({
                        success: false,
                        error: "UNKNOWN_DATA"
                    });
                }
                res.send({
                    success: true,
                    username: user.username,
                    email: user.email
            })
    });
});

app.post("/getPicturesData", (req, res) => {
    const { sesid } = req.cookies;
    getIdBySesid(sesid)
        .then((id) => {
            db.all(`SELECT p.id, p.name, p.qrcode, p.icon_name iconName 
            FROM pictures p 
            WHERE p.user_id=?`, [id], (err, pictures) => {
                if(err) return console.log(err);
                res.send({
                    success: true,
                    pictures
                });
            });
        }).catch((err) => {      
            if(err) return res.send({
                success: false,
                error: "Not found"
            });
        })
});

app.post("/getPictureData", (req, res) => {
    const { sesid } = req.cookies;
    const { id } = req.body;
    db.get(`SELECT p.id, p.name, p.description, p.qrcode, p.icon_name iconName 
            FROM pictures p 
            WHERE p.id=?
            LIMIT 1`, [id], (err, picture) => {
        db.all(`SELECT *, picture_id pictureId FROM pictures_info
            WHERE picture_id=?`, [id], (err, pictureInfo) => {
            if(err) return console.log(err);
            res.send({
                success: true,
                picture,
                pictureInfo
            });
        });
    })
});

app.post("/savePictureData", (req, res) => {
    const { id, changes } = req.body;
    db.run(`UPDATE pictures
            SET ${Object.keys(changes)[0]}=?
            WHERE id=?`, [changes[Object.keys(changes)[0]], id], (run, err) => {
                if(err) return console.log(err);
                res.send({success: true, changes });
            });
});

app.post("/savePictureInfo", (req, res) => {
    const { id, changes } = req.body;
    db.run(`UPDATE pictures_info
            SET ${Object.keys(changes)[0]}=?
            WHERE id=?`, [changes[Object.keys(changes)[0]], id], (run, err) => {
                if(err) return console.log(err);
                res.send({
                    success: true,
                    result: {
                        ...changes
                    }
                });
            });
});

app.post("/addPicture", multer({dest:"uploads"}).single("icon"), (req, res) => {
    
    const { sesid } = req.cookies;
    const { file, body } = req;
    const { name, description, qrcode } = body;

    getIdBySesid(sesid)
    .then((id) => {
        db.run(`INSERT INTO pictures (user_id, name, description, qrcode, icon_name)
                VALUES ($userId, $name, $description, $qrcode, $iconName)`,
                {
                    $userId: id,
                    $name: name,
                    $description: description,
                    $qrcode: qrcode,
                    $iconName: file.filename
                }, (run, err) => {
                    if(err) return console.log(err);
                    
                    const oldPath = path.join(__dirname, "/uploads/", file.filename);
                    const newPath = path.join(__dirname, "/../icons/", file.filename);
                    fs.rename(oldPath, newPath, () => {
                        res.send({
                            success: true
                        });
                    });
                });
    });
});

app.use("/deletePicture", (req, res) => {
    const { id } = req.body;
    db.run("DELETE FROM pictures WHERE id=?", [id], (run, err) => {
        if(err) return console.log(err);
        res.send({
            success: true
        });
    });
});

app.use("/addPictureInfo", (req, res) => {
    const { pictureId, title, description, language } = req.body;
    db.run(`INSERT INTO pictures_info 
                (picture_id, title, description, language)
            VALUES($pictureId, $title, $description, $language)`, 
            {
                $pictureId: pictureId,
                $title: title,
                $description: description,
                $language: language
            }, (run, err) => {
        if(err) return console.log(err);
        db.get(`SELECT *, picture_id pictureId 
                FROM pictures_info
                WHERE picture_id=?
                ORDER BY id DESC
                LIMIT 1`, [pictureId], (err, row) => {
                    if(err) return console.log(err);
                    res.send({
                        success: true,
                        addedPictureInfo: row
                    });
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

const getIdBySesid = (sesid, callback) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT id 
            FROM sesids
            WHERE sesid=?`, 
            [sesid], (err, result) => {
                if(err) {
                    return console.log(err);
                }
                if(!result) return reject("Not found");
                resolve(result.id);
            });
    });
}

app.listen(3006, () => console.log("LISTENING 3005 port..."));
