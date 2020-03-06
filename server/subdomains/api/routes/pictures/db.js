const { db, serverError, customError } = require("../../statics");
const { checkId } = require("../museums/db");
const { deleteFavoritePictureByPictureId } = require("../favorites/db");
const { parseJStoSQLQ } = require("../../utils");

exports.getPictures = (id, searchText, sortedField, sortedType, museumId, updateId, limit, pageNumber) => new Promise((resolve, reject) => {
    if (museumId === -1) return reject(customError("UNKNOWN_MUSEUM_ID"));
    let pictures, mid;
    checkId(museumId)
        .then(m => mid = m)
        .then(() => updateId === 'current' ?
            getPictures(id, searchText, sortedField, sortedType, mid, limit, pageNumber)
            : getOldPicturesByMuseumIdAndReleaseId(searchText, sortedField, sortedType, mid, limit, pageNumber, updateId))
        .then(ps => pictures = ps)
        .then(() => getPicturesPagesDataByRequest(id, searchText, limit, pageNumber))
        .then(pagesData => resolve({ pictures, pagesData, museumId: mid }))
        .catch(reject);
});

exports.deletePicture = (id) => new Promise((resolve, reject) => {
    deletePicture(id)
        .then(deleteFavoritePictureByPictureId(id))
        .then(resolve)
        .catch(reject);
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
            if (err) return reject(serverError());
            if (!picture) return reject(serverError());
            resolve(picture);
        });
});

exports.addPicture = (museumId, name, description, qrcode) => new Promise((resolve, reject) => {
    addPicture(museumId, name, description, qrcode)
        .then(() => getPictureByAll(museumId, name, description, qrcode))
        .then(resolve)
        .catch(reject);
});

const getPicturesPagesDataByRequest =
    (userId, searchText = '', limit = 1, pageNumber = 1) => new Promise((resolve, reject) => {
        db.get(`SELECT COUNT(id) as pagesCount
            FROM pictures
            WHERE museum_id=? AND name LIKE ?`,
            [1, `%${searchText}%`], (err, { pagesCount }) => {
                if (err) return reject({ SERVER_ERROR });
                resolve({ pagesCount: Math.round(pagesCount / limit), pageNumber })
            });
    });

const getPictures = (id, searchText, sortedField, sortedType, museumId, limit, pageNumber) => new Promise((resolve, reject) => {
    const sortedFieldsTransform = (field) => {
        switch (field) {
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
            if (err) return reject(serverError());
            resolve(pictures);
        });
});

exports.getPicturesByMuseumId = (museumId) => new Promise((resolve, reject) => {
    db.all(`SELECT id, museum_id museumId, qrcode, include_release includeRelease
            FROM pictures 
            WHERE museum_id=?`,
        [museumId], (err, pictures) => {
            if (err) return reject(serverError());

            resolve(pictures);
        });
});

exports.getReleasedPicturesByMuseumId = (museumId) => new Promise((resolve, reject) => {
    db.all(`SELECT id, museum_id museumId, name, description, qrcode
            FROM pictures_release
            WHERE museum_id=?`,
        [museumId], (err, pictures) => {
            if (err) return reject(serverError());

            resolve(pictures);
        });
});

const addPicture = (museumId, name, description, qrcode) => new Promise((resolve, reject) => {
    db.run(`INSERT INTO pictures (museum_id, name, description, qrcode, include_release)
            VALUES ($museumId, $name, $description, $qrcode, 0)`,
        {
            $museumId: museumId,
            $name: name,
            $description: description,
            $qrcode: qrcode
        }, (run, err) => {
            if (err || run) return reject(serverError());

            resolve();
        });
});

const deletePicture = (id) => new Promise((resolve, reject) => {
    db.run("DELETE FROM pictures WHERE id=?", [id], (run, err) => {
        if (err) return reject(serverError());

        resolve();
    });
});

exports.changePicture = (id, changes) => new Promise((resolve, reject) => {
    const sqlQ = parseJStoSQLQ(changes);
    db.run(`UPDATE pictures
            SET ${sqlQ.resultKeys}
            WHERE id=?`, sqlQ.resultValues.concat(id), (run, err) => {
        if (err || run) return reject(serverError());
        resolve(changes);
    });
});

const getPictureByAll = (museumId, name, description, qrcode) => new Promise((resolve, reject) => {
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
            if (err) return reject(serverError());
            if (!picture) return reject(serverError());
            resolve(picture);
        });
});

const getOldPicturesByMuseumIdAndReleaseId = (searchText, sortedField, sortedType, museumId, limit, pageNumber, updateId) =>
    new Promise((resolve, reject) => {
        const sortedFieldsTransform = (field) => {
            switch (field) {
                case 'created': return 'created_date';
                case 'changed': return 'changed_date';
                default: return field;
            }
        }
        const sortedQuery = sortedField === 'none' ? "" :
            `ORDER BY p.${sortedFieldsTransform(sortedField)} ${sortedType}`;
        db.all(`SELECT p.id, p.museum_id, p.name, p.description, p.qrcode, p.release_id releaseId,
                ( SELECT icon_name FROM pictures_icons_old pi WHERE pi.picture_id=p.id AND pi.release_id=? ) as iconName
            FROM pictures_old p 
            WHERE p.museum_id=? AND p.release_id=? AND p.name LIKE ?
            ${sortedQuery}
            LIMIT ?, ? `,
            [updateId, museumId, updateId, `%${searchText}%`, (pageNumber - 1) * limit, limit], (err, pictures) => {
                if (err) return reject(serverError());

                resolve(pictures);
            });
    });

