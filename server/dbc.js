const SERVER_ERROR = "SERVER_ERROR";

const db = require("./statics").db;
const utils = require("./utils");

const FavHelp = require("./dbhelpers/favorites-helper");
const PicHelp = require("./dbhelpers/picture-helper");
const PicIcoHelp = require("./dbhelpers/pictures-icons-helper");

exports.registerUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO users (username, email, password) 
                VALUES ($username, $email, $password)`, {
            $username: username,
            $email: email,
            $password: password
        }, (run, err) => {
            if (err) return reject({
                error: SERVER_ERROR
            });
            resolve({});
        });
    });
}

exports.getUserByEmailPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users u
                WHERE u.email=? AND u.password=? 
                LIMIT 1`, [
            email,
            password
        ], (err, user) => {
            if (err) return reject({
                error: SERVER_ERROR
            });
            if (!user) return reject({
                error: "UNKNOWN_USER"
            });
            resolve({
                ...user
            });
        });
    });
}

exports.deleteUserSession = (sesid) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM sesids WHERE sesid=?`, [sesid], (run, err) => {
            if (err) return reject({
                error: SERVER_ERROR
            });
            resolve({});
        });
    });
}

exports.getUser = (sesid) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users u 
                WHERE u.id=(
                    SELECT id FROM sesids s
                    WHERE s.sesid=?
                    LIMIT 1
                )`,
            [sesid], (err, user) => {
                if (err) {
                    return reject({
                        error: SERVER_ERROR
                    });
                }
                if (!user) {
                    return reject({
                        error: "UNKNOWN_DATA"
                    });
                }
                resolve({
                    username: user.username,
                    email: user.email
                });
            });
    });
}

exports.getPictures = (id, searchText, sortedField, sortedType) => {
    
    const sortedFieldsTransform = (field) => {
        switch(field) {
            case 'created': return 'created_date';
            case 'changed': return 'changed_date';
            default: return field;
        }
    }

    return new Promise((resolve, reject) => {
        const sortedQuery = sortedField === 'none' ? "" : 
            `ORDER BY ${sortedFieldsTransform(sortedField)} ${sortedType}`;

        db.all(`SELECT p.id, p.name, p.qrcode,
                EXISTS (
                    SELECT f.id 
                    FROM favorites_items f 
                    WHERE f.picture_id=p.id
                    ) as favorite,
                    ( SELECT icon_name FROM pictures_icons pi WHERE pi.picture_id=p.id ) as iconName
                FROM pictures p 
                WHERE p.user_id=? AND p.name LIKE ?
                ${sortedQuery}`,
            [id, `%${searchText}%`], (err, pictures) => {
                if (err) return reject({ error: SERVER_ERROR });
                resolve(pictures);
            });
    });
}

exports.getPictureInfo = (id) => new Promise((resolve, reject) => {
    PicHelp.getPictureById(id)
        .then(PicHelp.getIconsForPicture)
        .then(PicHelp.getInfoForPicture)
        .then(resolve)
        .catch(reject);
});

exports.addPicture = (userId, name, description, qrcode) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO pictures (user_id, name, description, qrcode)
                VALUES ($userId, $name, $description, $qrcode)`,
                {
                    $userId: userId,
                    $name: name,
                    $description: description,
                    $qrcode: qrcode
                }, (run, err) => {
                    if(err) return reject({ error: SERVER_ERROR });
                    
                    resolve({});
                });
    });
}

exports.addIconToPicture = (id, filename) => new Promise((resolve, reject) => {
    PicIcoHelp.addIconToPicturesIcons(id, filename)
        .then(PicIcoHelp.getIconFromPicturesIconsById)
        .then(resolve);
});

exports.deleteIconFromPictureById = (id) => new Promise((resolve, reject) => {
    db.run(`DELETE FROM pictures_icons
            WHERE id=?`
    [id], (run, err) => {
        if(err) return reject({ error: SERVER_ERROR });

        resolve(id);
    });
});

exports.deletePicture = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM pictures WHERE id=?", [id], (run, err) => {
            if(err) return reject({ error: SERVER_ERROR });
            
            resolve({});
        });
    });
}

exports.changePicture = (id, changes) => {
    return new Promise((resolve, reject) => {   
        const sqlQ = utils.parseJStoSQLQ(changes);
        db.run(`UPDATE pictures
                SET ${sqlQ.resultKeys}
                WHERE id=?`, sqlQ.resultValues.concat(id), (run, err) => {
                    if(err) return reject({ error: SERVER_ERROR });
                    reject(changes);
                });
    });
}

exports.changePictureInfo = (id, changes) => {
    return new Promise((resolve, reject) => {   
        const sqlQ = utils.parseJStoSQLQ(changes);
        db.run(`UPDATE pictures_info
            SET ${sqlQ.resultKeys}
            WHERE id=?`, sqlQ.resultValues.concat(id), (run, err) => {
                if(err) return reject({ error: SERVER_ERROR });
                resolve({
                    changes
                });
            });
    });
}

exports.addPictureInfo = (pictureId, title, description, language) => {
    return new Promise((resolve, reject) => {
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

            db.get(`SELECT *, picture_id pictureId 
                    FROM pictures_info
                    WHERE picture_id=?
                    ORDER BY id DESC
                    LIMIT 1`, [pictureId], (err, addedPictureInfo) => {
                        if(err) return reject({ error: SERVER_ERROR });
                        
                        resolve(addedPictureInfo);
                    });
        });
    });
}

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

exports.getFavoritesGroupsName = (id) => { // UNUSED
    return new Promise((resolve, reject) => {
        db.all(`SELECT name FROM favorites_groups
                WHERE user_id=?`, 
        [id], (err, names) => {
            if(err) return reject({ error: SERVER_ERROR });

            resolve(names);
        });
    });
}

exports.addFavotirePicture = (pictureId) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO favorites_items (group_id, picture_id, _index)
                VALUES (-1, ?, 0)`, 
        [pictureId], (run, err) => {
            if(err) return reject({ error: SERVER_ERROR });

            resolve({});
        })
    });
}

exports.deleteFavotirePicture = (id) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM favorites_items WHERE picture_id=?`, 
        [id], (run, err) => {
            if(err) return reject({ error: SERVER_ERROR });

            resolve({});
        })
    });
}

exports.addFavotireGroup = (userId, name, description) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO favorites_groups (user_id, name, description)
                VALUES (?, ?, ?)`, 
        [userId, name, description], (run, err) => {
            if(err) return reject({ error: SERVER_ERROR });

            db.get(`SELECT id, name, description 
                    FROM favorites_groups
                    WHERE name=? AND description=?
                    ORDER BY id DESC
                    LIMIT 1`,
            [name, description], (err, group) => {
                if(err) return reject({ error: SERVER_ERROR });
                
                resolve({
                    ...group,
                    items: []
                });
            });
        })
    });
}

exports.deleteFavotireGroup = (id) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM favorites_groups
                WHERE id=?`, 
        [id], (run, err) => {
            if(err) return reject({ error: SERVER_ERROR });
            db.run(`UPDATE favorites_items
                    SET group_id=?
                    WHERE group_id=?`,
            [-1, id], (run, err) => {
                if(err) return reject({ error: SERVER_ERROR });

                resolve({});
            });
        });
    });
}

exports.getIdBySesid = (sesid, callback) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT id 
            FROM sesids
            WHERE sesid=?`,
            [sesid], (err, result) => {
                if (err) return reject({ error: SERVER_ERROR });
                if (!result) return reject({
                    error: "UNKNOWN_DATA"
                });
                resolve(result.id);
            });
    });
}