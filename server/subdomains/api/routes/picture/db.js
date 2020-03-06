const { db, serverError, customError } = require("../../statics");
const { getPictureById } = require("../pictures/db");
const { parseJStoSQLQ } = require("../../utils");

exports.getPictureInfo = (id) => new Promise((resolve, reject) => {
    getPictureById(id)
        .then(getIconsForPicture)
        .then(getInfoForPicture)
        .then(resolve)
        .catch(reject);
});

exports.addIconToPicture = (id, filename) => new Promise((resolve, reject) => {
    addIconToPicturesIcons(id, filename)
        .then(getIconFromPicturesIconsById)
        .then(resolve);
});

const getIconsForPicture = (picture) => new Promise((resolve, reject) => {
    db.all(`SELECT id, picture_id pictureId, icon_name iconName 
            FROM pictures_icons
            WHERE picture_id=?`,
        [picture.id], (err, icons) => {
            if (err) return reject(serverError());

            picture.icons = icons;
            resolve(picture);
        });
});

const getInfoForPicture = (picture) => new Promise((resolve, reject) => {
    db.all(`SELECT *, picture_id pictureId FROM pictures_info
                WHERE picture_id=?`,
        [picture.id], (err, info) => {
            if (err) return reject(serverError());
            if (!info) return reject(customError("UNKNOWN_DATA"));

            resolve({ picture, pictureInfo: info });
        });
});

exports.getPicturesInfoByMuseumId = (museumId) => new Promise((resolve, reject) => {
    db.all(`SELECT id, picture_id pictureId, title, description, language
            FROM pictures_info
            WHERE picture_id IN
            (
                SELECT id FROM pictures WHERE museum_id=?
            )`,
    [museumId], (err, picturesInfo) => {
        if(err) return reject(serverError());

        resolve(picturesInfo);
    });
});

exports.getReleasedPicturesInfoByMuseumId = (museumId) => new Promise((resolve, reject) => {
    db.all(`SELECT id, picture_id pictureId, title, description, language
            FROM pictures_info_release
            WHERE picture_id IN
            (
                SELECT id FROM pictures_release WHERE museum_id=?
            )`,
    [museumId], (err, picturesInfo) => {
        if(err) return reject(serverError());

        resolve(picturesInfo);
    });
});

exports.getReleasedPicturesIconsByMuseumId = (museumId) => new Promise((resolve, reject) => {
    db.all(`SELECT id, picture_id pictureId, icon_name iconName
            FROM pictures_icons
            WHERE picture_id IN
            (
                SELECT id FROM pictures_release WHERE museum_id=?
            )`,
    [museumId], (err, picturesIcons) => {
        if(err) return reject(serverError());

        resolve(picturesIcons);
    });
});

exports.changePictureInfo = (id, changes) => new Promise((resolve, reject) => {   
    const sqlQ = parseJStoSQLQ(changes);
    
    db.run(`UPDATE pictures_info
            SET ${sqlQ.resultKeys}
            WHERE id=?`, 
    sqlQ.resultValues.concat(id), (run, err) => {
            if(err) return reject(serverError());
            resolve(changes);
        });
});

exports.addPictureInfo = (pictureId, title, description, language) => new Promise((resolve, reject) => {
    addPictureInfo(pictureId, title, description, language)
        .then(() => getLastPictureInfoByPictureId(pictureId))
        .then(resolve)
        .catch(reject);
});

const addPictureInfo = (pictureId, title, description, language) => new Promise((resolve, reject) => {
    db.run(`INSERT INTO pictures_info 
            (picture_id, title, description, language)
            VALUES($pictureId, $title, $description, $language)`, 
        {
            $pictureId: pictureId,
            $title: title,
            $description: description,
            $language: language
        }, (run, err) => {
        if(err || run) return reject(serverError());
        
        resolve();
    });
});

exports.removePictureInfoById = (id) => new Promise((resolve, reject) => {
    db.run(`DELETE FROM pictures_info
            WHERE id=?`,
    [id], (run, err) => {
        if(run || err) return reject(serverError());

        resolve();
    });
});

const getLastPictureInfoByPictureId = (pictureId) => new Promise((resolve, reject) => {
    db.get(`SELECT *, picture_id pictureId 
            FROM pictures_info
            WHERE picture_id=?
            ORDER BY id DESC
            LIMIT 1`, 
    [pictureId], (err, addedPictureInfo) => {
        if(err) return reject(serverError());
        resolve(addedPictureInfo);
    });
});



const addIconToPicturesIcons = (id, filename) => new Promise((resolve, reject) => {
    db.run(`INSERT INTO pictures_icons (picture_id, icon_name)
                VALUES (?, ?)`,
    [id, filename], (run, err) => {
        if (err || run) return reject(serverError());
        resolve({ id, filename });
    });
});

const getIconFromPicturesIconsById = ({ id, filename }) => new Promise((resolve, reject) => {
    db.get(`SELECT id, picture_id pictureId, icon_name iconName 
            FROM pictures_icons
            WHERE picture_id=? AND icon_name=?`,
        [id, filename], (err, icon) => {
            if (err) return reject(serverError());

            resolve(icon);
        });
});

exports.deleteIconFromPictureById = (id) => new Promise((resolve, reject) => {
    db.run(`DELETE FROM pictures_icons
            WHERE id=?`,
    [id], (run, err) => {
        if(run || err) return reject(serverError());

        resolve();
    });
});