const db = require("./statics").db;
const utils = require("./utils");

const UsersHelper = require("./dbhelpers/users-helper");
const SesidsHelper = require("./dbhelpers/sesids-helper");
const FavHelp = require("./dbhelpers/favorites-helper");
const PicHelp = require("./dbhelpers/picture-helper");
const PicsHelp = require("./dbhelpers/pictures-helper");
const PicturesInfoHelper = require("./dbhelpers/pictures-info-helper");
const PicIcoHelp = require("./dbhelpers/pictures-icons-helper");
const MusHelp = require("./dbhelpers/museums-helper");

exports.registerUser = UsersHelper.registerUser;
exports.getUser = UsersHelper.getUserBySesid;
exports.getUserByEmailPassword = UsersHelper.getUserByEmailAndPassword;

exports.deleteUserSession = SesidsHelper.deleteSesid;

exports.getMuseums = MusHelp.getMuseums;
exports.getMuseum = MusHelp.getMuseumById;

exports.newReleaseByMuseumId = (museumId) => new Promise((resolve, reject) => {
    let releaseId;
    MusHelp.getLastReleaseIdByMuseumId(museumId)
        .then(rid => releaseId = rid)
        .then(() => MusHelp.setReleaseIdByMuseumId(museumId, releaseId + 1, releaseId))
        .then(() => new Promise((resolve, reject) => {
            db.run(`INSERT INTO pictures_old
                    SELECT id, museum_id, name, description, qrcode, update_id release_id
                    FROM pictures
                    WHERE update_id=?`,
            [releaseId], (run, err) => {
                if(run || err) return reject({});
                console.log("1");
                resolve({});
            });
        }))
        .then(() => new Promise((resolve, reject) => {
            db.run(`INSERT INTO pictures_info_old
                    SELECT *, ?
                    FROM pictures_info
                    WHERE picture_id=
                    (
                        SELECT id FROM pictures WHERE update_id=?
                    )`,
            [releaseId, releaseId], (run, err) => {
                if(run || err) return reject({});
                console.log("2");

                resolve({});
            });
        }))
        .then(() => new Promise((resolve, reject) => {
            db.run(`UPDATE pictures
                    SET update_id=?
                    WHERE update_id=?`,
            [releaseId + 1, releaseId], (run, err) => {
                if(run || err) return reject({});
                console.log("3");

                resolve({});
            });
        }))
        .then(() => new Promise((resolve, reject) => {
            db.run(`DELETE FROM pictures_release
                    WHERE museum_id=?`,
            [museumId], (run, err) => {
                if(run || err) return reject({});
                console.log("4");

                resolve({});
            });
        }))
        .then(() => new Promise((resolve, reject) => {
            db.run(`DELETE FROM pictures_info_release
                    WHERE picture_id=
                    (
                        SELECT id FROM pictures WHERE museum_id=?
                    )`,
            [museumId], (run, err) => {
                console.log(run, err);
                if(run || err) return reject({});
                console.log("5");

                resolve({});
            });
        }))
        .then(() => new Promise((resolve, reject) => {
            db.run(`INSERT INTO pictures_info_release
                    SELECT id, picture_id, title, description, language
                    FROM pictures_info
                    WHERE picture_id=
                    (
                        SELECT id FROM pictures WHERE museum_id=?
                    )`,
            [museumId], (run, err) => {
                console.log(run, err);
                if(run || err) return reject({});
                console.log("6");

                resolve({});
            });
        }))
        .then(() => new Promise((resolve, reject) => {
            db.run(`INSERT INTO pictures_release
                    SELECT id, museum_id, name, description, qrcode
                    FROM pictures
                    WHERE update_id=?`,
            [releaseId + 1], (run, err) => {
                if(run || err) return reject({});
                console.log("7");

                resolve({});
            });
        }))
        .then(resolve)
        .catch(reject);
});

exports.getMuseumsByUserId = MusHelp.getMuseumsByUserId;

exports.addMuseum = (userId, name, location) => new Promise((resolve, reject) => {
    MusHelp.addMuseum(userId, name, location)
        .then(() => MusHelp.getLastMuseumByData(userId, name, location))
        .then(resolve)
        .catch(reject);
});

exports.removeMuseum = MusHelp.removeMuseum;

exports.changeMuseumData = MusHelp.changeMuseumData;

exports.getPicturesByMuseumId = PicsHelp.getPicturesByMuseumId;
exports.getReleasedPicturesByMuseumId = PicsHelp.getReleasedPicturesByMuseumId;

exports.getPicturesInfoByMuseumId = PicturesInfoHelper.getPicturesInfoByMuseumId;
exports.getReleasedPicturesInfoByMuseumId = PicturesInfoHelper.getReleasedPicturesInfoByMuseumId;

exports.getPictures = (id, searchText, sortedField, sortedType, museumId, limit, pageNumber) => new Promise((resolve, reject) => {
    let pictures, mid;
    MusHelp.checkId(museumId)
    .then(m => mid = m)
    .then(() => PicsHelp.getPictures(id, searchText, sortedField, sortedType, mid, limit, pageNumber))
    .then(ps => pictures = ps)
    .then(() => PicsHelp.getPicturesPagesDataByRequest(id, searchText, limit, pageNumber))
    .then(pagesData => resolve({ pictures, pagesData, museumId: mid }))
    .catch(reject);
});

exports.getPictureInfo = (id) => new Promise((resolve, reject) => {
    PicsHelp.getPictureById(id)
        .then(PicHelp.getIconsForPicture)
        .then(PicHelp.getInfoForPicture)
        .then(resolve)
        .catch(reject);
});

exports.addPicture = (museumId, name, description, qrcode) => new Promise((resolve, reject) => {
    PicsHelp.addPicture(museumId, name, description, qrcode)
        .then(() => PicsHelp.getPictureByAll(museumId, name, description, qrcode))
        .then(resolve)
        .catch(reject);
});

exports.addIconToPicture = (id, filename) => new Promise((resolve, reject) => {
    PicIcoHelp.addIconToPicturesIcons(id, filename)
        .then(PicIcoHelp.getIconFromPicturesIconsById)
        .then(resolve);
});

exports.deleteIconFromPictureById = PicIcoHelp.deleteIconById;

exports.deletePicture = PicsHelp.deletePicture;

exports.changePicture = PicsHelp.changePicture;

exports.changePictureInfo = PicturesInfoHelper.changePictureInfo;

exports.addPictureInfo = (pictureId, title, description, language) => new Promise((resolve, reject) => {
    PicturesInfoHelper.addedPictureInfo(pictureId, title, description, language)
        .then(() => PicturesInfoHelper.getLastPictureInfoByPictureId(pictureId))
        .then(resolve)
        .catch(reject);
});

exports.getFavorites = (id) => new Promise((resolve, reject) => {
    FavHelp.getFavoritesGroups(id)
    .then(FavHelp.getItemsInGroups)
    .then(FavHelp.getPictureForItems)
    .then(resolve)
    .catch(reject);
});

exports.changeFavorites = (groups) => {
    return new Promise((resolve, reject) => {
        let max = 0;
        let _index = 0;
        groups.forEach((group, index) => {
            const { id, name, description } = group;
            if(id !== -1) {
                max += group.items.length;
                db.run(`UPDATE favorites_groups
                        SET name=?, _index=?
                        WHERE id=?`,
                [name, index, id], (run, err) => {
                    if(err) return reject({ error: SERVER_ERROR });
                    group.items.forEach((item, index) => {
                        db.run(`UPDATE favorites_items
                                SET group_id=?, _index=?
                                WHERE id=?`, 
                        [group.id, index, item.id],
                        (run, err) => {
                            if(err) return reject({ error: SERVER_ERROR });
                            if(++_index === max) resolve({});
                        });
                    });
                });
            }
        });
    });
};

exports.addFavotirePicture = FavHelp.addFavoritePicture;

exports.deleteFavotirePicture = FavHelp.deleteFavoritePicture;

exports.addFavotireGroup = (userId, name, description) => new Promise((resolve, reject) => {
    FavHelp.addFavoriteGroup(userId, name, description)
        .then(() => FavHelp.getLastFavoriteGroupByData(name, description))
        .then(resolve)
        .catch(reject);
});

exports.deleteFavotireGroup = (id) => new Promise((resolve, reject) => {
    FavHelp.deleteFavoriteGroup(id)
        .then(() => FavHelp.clearFavoriteItemsByGroupId(id))
        .then(resolve)
        .catch(reject);
});

exports.getIdBySesid = SesidsHelper.getIdBySesid;