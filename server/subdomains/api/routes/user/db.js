const { db, serverError, customError } = require("../../statics");
const { hashPassword } = require("../../utils");

exports.verifyEmail = (link) => new Promise((resolve, reject) => {
    let email = "";
    this.checkVerifyLink(link)
        .then(has => new Promise((resolve, reject) => {
            if(!has) { 
                return reject(customError("UNKNOWN_LINK"));
            } 
            email = has.email;
            resolve();
        }))
        .then(() => this.removeVerifyEmail(link))
        .then(() => resolve({email}))
        .catch(reject)
});

exports.checkVerifyLink = (link) => new Promise((resolve, reject) => {
    db.get(`SELECT email, link FROM email_verify_links WHERE link=?`,
    [link], (err, row) => {
        if(err) return reject(serverError());
        resolve(row);
    });
});

exports.checkVerifyEmail = (email) => new Promise((resolve, reject) => {
    db.get(`SELECT email, link FROM email_verify_links WHERE email=?`,
    [email], (err, row) => {
        if(err) return reject(serverError());
        resolve(row);
    });
});

exports.removeVerifyEmail = (link) => new Promise((resolve, reject) => {
    db.run(`DELETE FROM email_verify_links WHERE link=?`,
    [link], (run, err) => {
        if(err || run) return reject(serverError());
        resolve({});
    });
});

exports.changeUserData = (id, changes) => new Promise((resolve, reject) => {
    let key = Object.keys(changes)[0];
    let f;
    if(key === 'password') f = changePassword(id, hashPassword(changes[key]));
    
    f.then(d => resolve({changes: d}))
     .catch(reject);
});

exports.loginIn = (email, password) => new Promise((resolve, reject) => {
    let user;
    this.getUserByEmailAndPassword(email, hashPassword(password))
    .then(u => {
        if(!u) reject(customError("UNKNOWN_DATA"));
        user = u;
        return this.checkVerifyEmail(email);
    })
    .then(has => {
        if(has) reject(customError("NEED_VERIFY_EMAIL", {link: has.link}));

        resolve(user)
    }).catch(reject);
});


exports.getUser = (id) => new Promise((resolve, reject) => {
    let user;

    this.getUserById(id)
        .then(u => {
            if(!u) return reject(customError("UNKNOWN_SESID"))
            user = u;
            return this.checkVerifyEmail(u.email);
        }).then(has => {
            if(has) return reject(customError("NEED_VERIFY_EMAIL"));

            resolve(user);
        }).catch(reject);
});

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
                return reject(serverError());
            }
            if (!user) {
                return reject(customError("UNKNOWN_DATA"));
            }
            resolve({
                username: user.username,
                email: user.email
            });
        });
});

exports.getUserById = (id) => new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users u 
            WHERE u.id=?`,
        [id], (err, user) => {
            if (err) {
                return reject(serverError());
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
            if (err) return reject(serverError());
            if (!result) return reject(customError("UNKNOWN_DATA"));
            resolve(result.id);
        });
});
