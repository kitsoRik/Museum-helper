const utils = require("../utils");
const db = require("../statics").db;

exports.getPicturesInfoByMuseumId = (museumId) => new Promise((resolve, reject) => {
    db.all(`SELECT id, picture_id pictureId, title, description, language
            FROM pictures_info
            WHERE picture_id=
            (
                SELECT id FROM pictures WHERE museum_id=?
            )`,
    [museumId], (err, picturesInfo) => {
        if(err) return reject({ error: SERVER_ERROR });

        resolve(picturesInfo);
    });
});

exports.getReleasedPicturesInfoByMuseumId = (museumId) => new Promise((resolve, reject) => {
    db.all(`SELECT id, picture_id pictureId, title, description, language
            FROM pictures_info_release
            WHERE picture_id=
            (
                SELECT id FROM pictures_release WHERE museum_id=?
            )`,
    [museumId], (err, picturesInfo) => {
        if(err) return reject({ error: SERVER_ERROR });

        resolve(picturesInfo);
    });
});

exports.changePictureInfo = (id, changes) => new Promise((resolve, reject) => {   
    const sqlQ = utils.parseJStoSQLQ(changes);
    console.log(id);
    db.run(`UPDATE pictures_info
        SET ${sqlQ.resultKeys}
        WHERE id=?`, sqlQ.resultValues.concat(id), (run, err) => {
            if(err) return reject({ error: SERVER_ERROR });
            resolve({
                changes
            });
        });
});

exports.addedPictureInfo = (pictureId, title, description, language) => new Promise((resolve, reject) => {
    db.run(`INSERT INTO pictures_info 
            (picture_id, title, description, language)
            VALUES($pictureId, $title, $description, $language)`, 
        {
            $pictureId: pictureId,
            $title: title,
            $description: description,
            $language: language
        }, (run, err) => {
        if(err) return reject({ error: SERVER_ERROR });
        
        resolve({ });
    });
});

exports.getLastPictureInfoByPictureId = (pictureId) => new Promise((resolve, reject) => {
    db.get(`SELECT *, picture_id pictureId 
            FROM pictures_info
            WHERE picture_id=?
            ORDER BY id DESC
            LIMIT 1`, 
    [pictureId], (err, addedPictureInfo) => {
        if(err) return reject({ error: SERVER_ERROR });
        
        resolve({ addedPictureInfo });
    });
});
