const { serverError, customError, sendAllData, sendError } = require("./statics");
const utils = require("./utils");
const express = require("express");
const router = express.Router();
const dbc = require('./dbc');

const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

router.use(cookieParser());
router.use(bodyParser.json());

router.use(/.*/, (req, res, next) => {
    if(req.headers.origin)
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

router.use(require("./routes/register"));
router.use(require("./routes/login"));
router.use(require("./routes/app"));
router.use((req, res, next) => {
    const { sesid } = req.cookies;
    if(!sesid) {
        res.send({
            success: false,
            error: "UNLOGINED_USER"
        });
        return;
    }
    dbc.getIdBySesid(sesid)
        .then(id => {
            req._payload = {
                user: {
                    id
                }
            };
            next();
        }).catch(sendError(res));
});
router.use(require("./routes/user"));
router.use(require("./routes/picture"));
router.use(require("./routes/museums"));
router.use(require("./routes/pictures"));
router.use(require("./routes/favorites"));

router.post("/newReleaseMuseum", (req, res) => {
    const { museumId } = req.body;
    
    dbc.newReleaseByMuseumId(museumId)
        .then(sendAllData(res))
        .catch(sendError(res));
});

module.exports = router;