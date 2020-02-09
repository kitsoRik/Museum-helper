const db = require("../statics").db;

exports.addIconToPicturesIcons = (id, filename) => new Promise((resolve, reject) => {
    db.run(`INSERT INTO pictures_icons (picture_id, icon_name)
                VALUES (?, ?)`,
    [id, filename], (run, err) => {
        if (err) return reject({ error: SERVER_ERROR });
        resolve({ id, filename });
    });
});

exports.getIconFromPicturesIconsById = ({ id, filename }) => new Promise((resolve, reject) => {
    db.get(`SELECT id, picture_id pictureId, icon_name iconName 
            FROM pictures_icons
            WHERE picture_id=? AND icon_name=?`,
        [id, filename], (err, icon) => {
            if (err) return reject({ error: SERVER_ERROR });

            resolve(icon);
        });
});