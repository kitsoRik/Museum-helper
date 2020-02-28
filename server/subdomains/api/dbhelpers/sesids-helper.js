const db = require("../statics").db;
const { ServerError } = require("../statics"); 

exports.deleteSesid = (sesid) => new Promise((resolve, reject) => {
    db.run(`DELETE FROM sesids WHERE sesid=?`, [sesid], (run, err) => {
        if (err) return reject(ServerError);
        resolve({});
    });
});

exports.getIdBySesid = (sesid) => new Promise((resolve, reject) => {
    db.get(`SELECT id 
        FROM sesids
        WHERE sesid=?`,
        [sesid], (err, result) => {
            if (err) return reject({ error: SERVER_ERROR });
            if (!result) return reject({
                error: "UNKNOWN_DATA"
            });
            resolve(result.id);
        });
});
