const db = require("./statics").db;
const utils = require("./utils");
const { customError, serverError } = require("./statics");

const UsersHelper = require("./dbhelpers/users-helper");
const SesidsHelper = require("./dbhelpers/sesids-helper");
const FavHelp = require("./dbhelpers/favorites-helper");
const PicHelp = require("./dbhelpers/picture-helper");
const PicsHelp = require("./dbhelpers/pictures-helper");
const PicturesInfoHelper = require("./dbhelpers/pictures-info-helper");
const PicIcoHelp = require("./dbhelpers/pictures-icons-helper");
const MusHelp = require("./dbhelpers/museums-helper");
const PicturesOldHelper = require("./dbhelpers/pics-old-helper");

exports.registerUser = UsersHelper.registerUser;

exports.verifyEmail = (link) => new Promise((resolve, reject) => {
    this.checkVerifyLink(link)
        .then(has => new Promise((resolve, reject) => {
            if(has) return this.removeVerifyEmail(link)
                                .then(resolve);
            reject(customError("UNKNOWN_LINK"));
        }))
        .then(this.removeVerifyEmail)
        .then(resolve)
        .catch(reject)
});

exports.checkVerifyLink = (link) => new Promise((resolve, reject) => {
    db.get(`SELECT email, link FROM email_verify_links WHERE link=?`,
    [link], (err, row) => {
        if(err) return reject(serverError());
        resolve(row ? true : false);
    });
});

exports.checkVerifyEmail = (email) => new Promise((resolve, reject) => {
    db.get(`SELECT email, link FROM email_verify_links WHERE email=?`,
    [email], (err, row) => {
        if(err) return reject(serverError());
        resolve(row);
    });
});

exports.removeVerifyEmail = (link) => new Promise((resolve, reject) => {
    db.run(`DELETE FROM email_verify_links WHERE link=?`,
    [link], (run, err) => {
        if(err || run) return reject(serverError());
        resolve({});
    });
});

exports.changeUserData = (id, changes) => new Promise((resolve, reject) => {
    let key = Object.keys(changes)[0];
    let f;
    if(key === 'password') f = UsersHelper.changePassword(id, utils.hashPassword(changes[key]));
    
    f.then(d => resolve({changes: d}))
     .catch(reject);
});

exports.checkPasswordById = UsersHelper.checkPassword;

exports.loginIn = (email, password) => new Promise((resolve, reject) => {
    let user;
    this.getUserByEmailPassword(email, utils.hashPassword(password))
    .then(u => {
        if(!u) reject(customError("UNKNOWN_DATA"));
        user = u;
        return this.checkVerifyEmail(email);
    })
    .then(has => {
        if(has) reject(customError("NEED_VERIFY_EMAIL", {link: has.link}));

        resolve(user)
    }).catch(reject);
});
exports.getUser = (id) => new Promise((resolve, reject) => {
    let user;

    UsersHelper.getUserById(id)
        .then(u => {
            if(!u) return reject(customError("UNKNOWN_SESID"))
            user = u;
            return this.checkVerifyEmail(u.email);
        }).then(has => {
            if(has) return reject(customError("NEED_VERIFY_EMAIL"));

            resolve(user);
        }).catch(reject);
});

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
                    SELECT id, museum_id, name, description, qrcode, ?
                    FROM pictures
                    WHERE museum_id=? AND include_release=1`,
            [releaseId, museumId], (run, err) => {
                if(run || err) return reject({});
                resolve({});
            });
        }))
        .then(() => new Promise((resolve, reject) => {
            db.run(`INSERT INTO pictures_info_old
                    SELECT *, ?
                    FROM pictures_info
                    WHERE picture_id IN
                    (
                        SELECT id FROM pictures WHERE museum_id=? AND include_release=1
                    )`,
            [releaseId, museumId], (run, err) => {
                if(run || err) return reject({});

                resolve({});
            });
        }))
        .then(() => new Promise((resolve, reject) => {
            db.run(`DELETE FROM pictures_release
                    WHERE museum_id=?`,
            [museumId], (run, err) => {
                if(run || err) return reject({});

                resolve({});
            });
        }))
        .then(() => new Promise((resolve, reject) => {
            db.run(`DELETE FROM pictures_info_release
                    WHERE picture_id IN
                    (
                        SELECT id FROM pictures WHERE museum_id=?
                    )`,
            [museumId], (run, err) => {
                if(run || err) return reject({});

                resolve({});
            });
        }))
        .then(() => new Promise((resolve, reject) => {
            db.run(`INSERT INTO pictures_info_release
                    SELECT id, picture_id, title, description, language
                    FROM pictures_info
                    WHERE picture_id IN
                    (
                        SELECT id FROM pictures WHERE museum_id=? AND include_release=1
                    )`,
            [museumId], (run, err) => {
                console.log(run, err);
                if(run || err) return reject({});
                console.log(5);

                resolve({});
            });
        }))
        .then(() => new Promise((resolve, reject) => {
            db.run(`INSERT INTO pictures_release
                    SELECT id, museum_id, name, description, qrcode
                    FROM pictures
                    WHERE museum_id=? AND include_release=1`,
            [museumId], (run, err) => {
                if(run || err) return reject({});
                console.log(6);

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
exports.getReleasedPicturesIconsByMuseumId = PicturesInfoHelper.getReleasedPicturesIconsByMuseumId;

exports.getPictures = (id, searchText, sortedField, sortedType, museumId, updateId, limit, pageNumber) => new Promise((resolve, reject) => {
    if(museumId === -1) return reject(customError("UNKNOWN_MUSEUM_ID"));
    let pictures, mid;
    MusHelp.checkId(museumId)
    .then(m => mid = m)
    .then(() => updateId === 'current' ?
         PicsHelp.getPictures(id, searchText, sortedField, sortedType, mid, limit, pageNumber)
         : PicturesOldHelper.getOldPicturesByMuseumIdAndReleaseId(searchText, sortedField, sortedType, mid, limit, pageNumber, updateId))
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

exports.deletePicture = (id) => new Promise((resolve, reject) => {
    PicsHelp.deletePicture(id)
        .then(FavHelp.deleteFavoritePictureByPictureId(id))
        .then(resolve)
        .catch(reject);
});

exports.changePicture = PicsHelp.changePicture;

exports.changePictureInfo = PicturesInfoHelper.changePictureInfo;

exports.addPictureInfo = (pictureId, title, description, language) => new Promise((resolve, reject) => {
    PicturesInfoHelper.addedPictureInfo(pictureId, title, description, language)
        .then(() => PicturesInfoHelper.getLastPictureInfoByPictureId(pictureId))
        .then(addedPictureInfo => {
            if(!addedPictureInfo) return reject(serverError());

            resolve({ addedPictureInfo });
        })
        .catch(reject);
});

exports.removePictureInfo = PicturesInfoHelper.removePictureInfoById;

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

exports.deleteFavotirePicture = FavHelp.deleteFavoritePictureByPictureId;

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