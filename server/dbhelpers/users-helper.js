const db = require("../statics").db;
const { customError, serverError } = require("../statics");

exports.checkPassword = (id, password) => new Promise((resolve, reject) => {
    db.get(`SELECT id FROM users WHERE id=? AND password=?`,
    [id, password], (err, row) => {
        if(err || !row) return reject(customError("BAD_OLD_PASSWORD"));
        resolve({});
    })
});

exports.changePassword = (id, password) => new Promise((resolve, reject) => {
    db.run(`UPDATE users SET password=? WHERE id=?`,
    [password, id], (run, err) => {
        if(run || err) return reject(serverError());
        resolve({ password: "" });
    })
});

exports.getUserBySesid = (sesid) => new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users u 
            WHERE u.id=(
                SELECT id FROM sesids s
                WHERE s.sesid=?
                LIMIT 1
            )`,
        [sesid], (err, user) => {
            if (err) {
                return reject({
                    error: SERVER_ERROR
                });
            }
            if (!user) {
                return reject({
                    error: "UNKNOWN_DATA"
                });
            }
            resolve({
                username: user.username,
                email: user.email
            });
        });
});

exports.getUserByEmailAndPassword = (email, password) => new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users u
            WHERE u.email=? AND u.password=? 
            LIMIT 1`, [
        email,
        password
    ], (err, user) => {
        if (err) return reject(serverError());
        resolve(user);
    });
});