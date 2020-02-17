const db = require("../statics").db;
const utils = require("../utils");

exports.getIconsForPicture = (picture) => new Promise((resolve, reject) => {
    db.all(`SELECT id, picture_id pictureId, icon_name iconName 
            FROM pictures_icons
            WHERE picture_id=?`,
        [picture.id], (err, icons) => {
            if (err) return reject({ error: SERVER_ERROR });

            picture.icons = icons;
            resolve(picture);
        });
});

exports.getInfoForPicture = (picture) => new Promise((resolve, reject) => {
    db.all(`SELECT *, picture_id pictureId FROM pictures_info
                WHERE picture_id=?`,
        [picture.id], (err, info) => {
            if (err) return reject({ error: SERVER_ERROR });
            if (!info) return reject({ error: "UNKNOWN_DATA" });

            resolve({ picture, pictureInfo: info });
        });
});
