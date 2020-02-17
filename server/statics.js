const sqlite = require("sqlite3").verbose();
const path = require("path");

exports.db = new sqlite.Database(path.resolve(__dirname, "../databases/nice.db"));

const SERVER_ERROR = "SERVER_ERROR";

exports.rejectError = (reject) => reject({ error: SERVER_ERROR });