const SERVER_ERROR = "SERVER_ERROR";

const db = require("../statics").db;
const utils = require("../utils");

exports.getMuseums = (name ) => new Promise((resolve, reject) => {
    db.all(`SELECT id, name, location, update_id updateId
            FROM museums
            WHERE name LIKE ?`,
    [`%${name}%`], (err, museums) => {
        if(err) return reject({ error: SERVER_ERROR });

        resolve(museums);
    });
});

exports.getMuseumById = (id) => new Promise((resolve, reject) => {
    db.get(`SELECT id, name, location, update_id updateId FROM museums
            WHERE id=?`,
    [id], (err, museum) => {
        if(err) return reject({ error: SERVER_ERROR });

        resolve(museum);
    });
});

exports.changeMuseumData = (id, changes) => new Promise((resolve, reject) => {
    const key = Object.keys(changes)[0];
    db.run(`UPDATE museums 
            SET ${key}=?`,
    [changes[key]], (run, err) => {
        if(run || err) reject({});
        resolve({});
    });
});

exports.checkId = (id) => new Promise((resolve, reject) => {
    if(id !== -1) return resolve(id);

    db.get(`SELECT id 
            FROM museums
            ORDER BY id DESC
            LIMIT 1`,
    (err, row) => {
        if(err) return reject({ SERVER_ERROR });
        if(!row) return resolve(-1);
        resolve(row.id);
    });
});

exports.addMuseum = (userId, name, location) => new Promise((resolve, reject) => {
    db.run(`INSERT INTO museums (owner_id, name, location, icon_name)
            VALUES (?, ?, ?, ?)`,
    [userId, name, location, ""], (run, err) => {
        if(err || run) return reject({ error: SERVER_ERROR });
        resolve({});
    });
});

exports.removeMuseum = (museumId) => new Promise((resolve, reject) => {
    db.run(`DELETE FROM museums
            WHERE id=?`,
    [museumId], (run, err) => {
        if(run || err) return reject({});
        resolve({});
    })
});

exports.getLastReleaseIdByMuseumId = (museumId) => new Promise((resolve, reject) => {
    db.get(`SELECT update_id updateId
            FROM museums
            WHERE id=?`,
    [museumId], (err, row) => {
        console.log(err);
        if(err) return reject({ error: SERVER_ERROR });

        resolve(row.updateId);
    });
});

exports.setReleaseIdByMuseumId = (museumId, releaseId, lastReleaseId) => new Promise((resolve, reject) => {
    db.run(`UPDATE museums
            SET update_id=? 
            WHERE id=? AND update_id=?`,
    [releaseId, museumId, lastReleaseId], (run, err) => {
        console.log(err, run);
        if(run || err) return reject({ error: SERVER_ERROR });
        resolve({});
    });
});

exports.getLastMuseumByData = (userId, name, location) => new Promise((resolve, reject) => {
    db.get(`SELECT id, name, location, icon_name iconName, update_id updateId
            FROM museums
            WHERE owner_id=? AND name=? AND location=? 
            ORDER BY id DESC
            LIMIT 1`,
    [userId, name, location], (err, museum) => {
        if(err) return reject({ error: SERVER_ERROR });
        if(!museum) return reject({ error: SERVER_ERROR });
        resolve({addedMuseum: museum});
    });
});

exports.getMuseumsByUserId = (userId) => new Promise((resolve, reject) => {
    db.all(`SELECT id, name, location, icon_name iconName, update_id updateId
            FROM museums 
            WHERE owner_id=?`,
    [userId], (err, museums) => {
        if(err) return reject({ error: SERVER_ERROR });

        resolve({ museums });
    });
});