const utils = require("../../utils");
const { customError, serverError, db } = require("../../statics");

exports.registerUser = (username, email, password) => new Promise((resolve, reject) => {
    this.checkAvailabilityEmail(email)
        .then(() => this.checkAvailabilityUsername(username))
        .then(() => this.insertUser(username, email, password))
        .then(resolve)
        .catch(reject);
});

exports.checkAvailabilityEmail = (email) => new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE email=?`,
    [email], (err, row) => {
        if(err) return reject(serverError());
        if(row) return reject(customError("BUSY_EMAIL", { field: "email"}));

        resolve({});
    });
});

exports.checkAvailabilityUsername = (username) => new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE username=?`,
    [username], (err, row) => {
        if(err) return reject(serverError());
        if(row) return reject(customError("BUSY_USERNAME", { field: "username"}));

        resolve({});
    });
});

exports.insertUser = (username, email, password) => new Promise((resolve, reject) => {
    db.run(`INSERT INTO users (username, email, password) 
    VALUES ($username, $email, $password)`, {
        $username: username,
        $email: email,
        $password: password
    }, (run, err) => {
        if (err || run) return reject({
            error: SERVER_ERROR
        });
        resolve({});
    });
});

exports.setVerifyLink = (email, link) => new Promise((resolve, reject) => {
    db.run(`INSERT INTO email_verify_links (email, link) VALUES (?, ?)`,
        [email, link], (run, err) => {
            if (run || err) reject(customError("LINK_ERROR"));

            resolve(link);
        });
});
