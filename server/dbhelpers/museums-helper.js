const SERVER_ERROR = "SERVER_ERROR";

const db = require("../statics").db;

exports.checkId = (id) => new Promise((resolve, reject) => {
    if(id !== -1) return resolve(id);

    db.get(`SELECT id 
            FROM museums
            ORDER BY id DESC
            LIMIT 1`,
    (err, row) => {
        if(err) reject({ SERVER_ERROR });

        resolve(row.id);
    });
});

exports.getMuseumsMinimize = (userId) => new Promise((resolve, reject) => {
    db.all(`SELECT id, name
            FROM museums
            WHERE owner_id=?`,
    [userId], (err, rows) => {
        if(err) return reject({ error: SERVER_ERROR });

        resolve(rows);
    });
});