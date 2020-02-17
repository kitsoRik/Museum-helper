const SERVER_ERROR = "SERVER_ERROR";

const db = require("../statics").db;
const utils = require("../utils");

exports.getPicturesPagesDataByRequest = 
    (userId, searchText = '', limit = 1, pageNumber = 1) => new Promise((resolve, reject) => {
    db.get(`SELECT COUNT(id) as pagesCount
            FROM pictures
            WHERE museum_id=? AND name LIKE ?`,
    [1, `%${searchText}%`], (err, { pagesCount }) => {
        if(err) return reject({ SERVER_ERROR });
        resolve({ pagesCount: Math.round(pagesCount / limit), pageNumber })
    });
});

exports.getPictures = (id, searchText, sortedField, sortedType, museumId, limit, pageNumber) => new Promise((resolve, reject) => {
    
    const sortedFieldsTransform = (field) => {
        switch(field) {
            case 'created': return 'created_date';
            case 'changed': return 'changed_date';
            default: return field;
        }
    }
            
    const sortedQuery = sortedField === 'none' ? "" : 
        `ORDER BY p.${sortedFieldsTransform(sortedField)} ${sortedType}`;
    db.all(`SELECT p.id, p.name, p.description, p.qrcode, p.include_release includeRelease,
            EXISTS (
                SELECT f.id 
                FROM favorites_items f 
                WHERE f.picture_id=p.id
                ) as favorite,
                ( SELECT icon_name FROM pictures_icons pi WHERE pi.picture_id=p.id ) as iconName
            FROM pictures p 
            WHERE p.museum_id=? AND p.name LIKE ?
            ${sortedQuery}
            LIMIT ?, ? `,
        [museumId, `%${searchText}%`, (pageNumber - 1) * limit, limit], (err, pictures) => {
            if (err) return reject({ error: SERVER_ERROR });
            resolve(pictures);
        });
});

exports.getPicturesByMuseumId = (museumId) => new Promise((resolve, reject) => {
    db.all(`SELECT id, museum_id museumId, qrcode, include_release includeRelease
            FROM pictures 
            WHERE museum_id=?`,
    [museumId], (err, pictures) => {
        if(err) return reject({ error: SERVER_ERROR });

        resolve(pictures);
    });
});

exports.getReleasedPicturesByMuseumId = (museumId) => new Promise((resolve, reject) => {
    db.all(`SELECT id, museum_id museumId, name, description, qrcode
            FROM pictures_release
            WHERE museum_id=?`,
    [museumId], (err, pictures) => {
        console.log(err);
        if(err) return reject({ error: SERVER_ERROR });

        resolve(pictures);
    });
});

exports.addPicture = (museumId, name, description, qrcode) => new Promise((resolve, reject) => {
    db.run(`INSERT INTO pictures (museum_id, name, description, qrcode, include_release)
            VALUES ($museumId, $name, $description, $qrcode, 0)`,
    {
        $museumId: museumId,
        $name: name,
        $description: description,
        $qrcode: qrcode
    }, (run, err) => {
        if(err) return reject({ error: SERVER_ERROR });
        
        resolve({});
    });
});

exports.deletePicture = (id) => new Promise((resolve, reject) => {
    db.run("DELETE FROM pictures WHERE id=?", [id], (run, err) => {
        if(err) return reject({ error: SERVER_ERROR });
        
        resolve({});
    });
});

exports.changePicture = (id, changes) => new Promise((resolve, reject) => {   
    const sqlQ = utils.parseJStoSQLQ(changes);
    console.log(changes);
    db.run(`UPDATE pictures
            SET ${sqlQ.resultKeys}
            WHERE id=?`, sqlQ.resultValues.concat(id), (run, err) => {
                if(err || run) return reject({ error: SERVER_ERROR });
                resolve({ changes });
            });
});

exports.getPictureById = (id) => new Promise((resolve, reject) => {
    db.get(`SELECT p.id, p.name, p.description, p.qrcode, p.include_release includeRelease,
                (
                    SELECT icon_name FROM pictures_icons pi WHERE pi.picture_id=p.id 
                ) as iconName,
            EXISTS (
                SELECT f.id 
                FROM favorites_items f 
                WHERE f.picture_id=p.id
                ) as favorite
            FROM pictures p
            WHERE p.id=?
            LIMIT 1`,
        [id], (err, picture) => {
            if (err) return reject({ error: SERVER_ERROR });
            if (!picture) return reject({ error: SERVER_ERROR });
            resolve(picture);
        });
});

exports.getPictureByAll = (museumId, name, description, qrcode) => new Promise((resolve, reject) => {
    db.get(`SELECT p.id, p.name, p.description, p.qrcode, p.include_release includeRelease,
                (
                    SELECT icon_name FROM pictures_icons pi WHERE pi.picture_id=p.id 
                ) as iconName,
            EXISTS (
                SELECT f.id 
                FROM favorites_items f 
                WHERE f.picture_id=p.id
                ) as favorite
            FROM pictures p
            WHERE p.museum_id=? AND p.name=? AND p.description=? AND p.qrcode=?
            LIMIT 1`,
        [museumId, name, description, qrcode], (err, picture) => {
            if (err) return reject({ error: SERVER_ERROR });
            if (!picture) return reject({ error: SERVER_ERROR });
            resolve({picture});
        });
});


