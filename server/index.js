const express = require("express");
const app = express();

const path = require("path");
const sqlite = require("sqlite3").verbose();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const db = new sqlite.Database(path.resolve(__dirname, "../databases/nice.db"));

app.use(cookieParser());
app.use(bodyParser.json());
app.use("/static/pictureIcons", express.static(path.join(__dirname, "/../icons")));

app.use(/.*/, (req, res, next) => {
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
                error: "Net takogo"
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
                        error: "Net takogo"
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
    res.send({
        success: true,
        pictures: [
            {
                id: 0,
                title: "Mona Liza",
                iconName: "123.png"
            },
            {
                id: 1,
                title: "Ded na znegy",
                iconName: "123.png"
            }
        ]
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

app.listen(3005, () => console.log("LISTENING 3005 port..."));
