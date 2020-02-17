const db = require("../statics").db;

exports.registerUser = (username, email, password) => new Promise((resolve, reject) => {
    db.run(`INSERT INTO users (username, email, password) 
            VALUES ($username, $email, $password)`, {
        $username: username,
        $email: email,
        $password: password
    }, (run, err) => {
        if (err) return reject({
            error: SERVER_ERROR
        });
        resolve({});
    });
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
        if (err) return reject({
            error: SERVER_ERROR
        });
        if (!user) return reject({
            error: "UNKNOWN_USER"
        });
        resolve({
            ...user
        });
    });
});