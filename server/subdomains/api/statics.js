const sqlite = require("sqlite3").verbose();
const path = require("path");

exports.db = new sqlite.Database(path.resolve(__dirname, "../../../databases/nice.db"));

const SERVER_ERROR = "SERVER_ERROR";

exports.serverError = () => ({ error: SERVER_ERROR });
exports.customError = (type, other = {}) => ({ type, ...other });



exports.sendAllData = (res, other) => data =>
    res.send({ success: true, ...other, ...data });
exports.sendError = res => (e) => { 
    if(!e) e.text = SCRIPT_ERROR;
    res.send({ success: false, error: e });
};