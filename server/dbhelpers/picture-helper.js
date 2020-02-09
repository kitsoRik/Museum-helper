const db = require("../statics").db;

exports.getPictureById = (id) => new Promise((resolve, reject) => {
    db.get(`SELECT p.id, p.name, p.description, p.qrcode, 
                (
                    SELECT icon_name FROM pictures_icons pi WHERE pi.picture_id=p.id 
                ) as iconName
            FROM pictures p
            WHERE p.id=?
            LIMIT 1`,
        [id], (err, picture) => {
            if (err) return reject({ error: SERVER_ERROR });
            if (!picture) return reject({ error: SERVER_ERROR });
            resolve(picture);
        });
});

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
