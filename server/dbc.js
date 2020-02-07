const SERVER_ERROR = "SERVER_ERROR";

const path = require("path");
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database(path.resolve(__dirname, "../databases/nice.db"));
const utils = require("./utils");

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

exports.getPictures = (id) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT p.id, p.name, p.qrcode, p.icon_name iconName,
                EXISTS (
                    SELECT f.id 
                    FROM favorites_items f 
                    WHERE f.picture_id=p.id
                    ) as favorite
                FROM pictures p 
                WHERE p.user_id=?`,
            [id], (err, pictures) => {
                if (err) return reject({ error: SERVER_ERROR });
                resolve(pictures);
            });
    });
}

exports.getPictureInfo = (id) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT p.id, p.name, p.description, p.qrcode, p.icon_name iconName 
            FROM pictures p 
            WHERE p.id=?
            LIMIT 1`, 
        [id], (err, picture) => {
            if(err) return reject({ error: SERVER_ERROR });
            if(!picture) return reject({ error: "UNKNOWN_ID" });
            
            db.all(`SELECT *, picture_id pictureId FROM pictures_info
            WHERE picture_id=?`, [id], (err, pictureInfo) => {
                if (err) return reject({ error: SERVER_ERROR });
                if(!pictureInfo) return reject({ error: "UNKNOWN_DATA" });

                resolve({picture, pictureInfo});
            });
        })
    });
}

exports.addPicture = (userId, name, description, qrcode, filename) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO pictures (user_id, name, description, qrcode, icon_name)
                VALUES ($userId, $name, $description, $qrcode, $iconName)`,
                {
                    $userId: userId,
                    $name: name,
                    $description: description,
                    $qrcode: qrcode,
                    $iconName: filename
                }, (run, err) => {
                    if(err) return reject({ error: SERVER_ERROR });
                    
                    resolve({});
                });
    });
}

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

exports.getFavorites = (id) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT id, name, description 
                FROM favorites_groups
                WHERE user_id=?
                `, [id], (err, _groups) => {
                    if(err) return reject({ error: SERVER_ERROR });
                    
                    const groups = _groups;
                    let _index = 0;
                    let max = 0;
                    groups.push({ id: -1, name: "Other", description: "NONE" })
                    
                    groups.forEach((group, indexg) => {
                        db.all(`SELECT id, picture_id pictureId
                                FROM favorites_items
                                WHERE group_id=?
                                ORDER BY _index ASC`, [group.id],
                                (err, items) => {
                                    if(err) return reject({ error: SERVER_ERROR });
                                    max += items.length;
                                    groups[indexg].items = items;
                                    groups[indexg].items.forEach((item, index) => {
                                        db.get(`SELECT id, name, description, icon_name iconName FROM pictures
                                            WHERE id=?`, [item.pictureId], 
                                            (err, row) => {
                                                if(err) return reject({ error: SERVER_ERROR });
                                                groups[indexg].items[index].picture = row;
                                                if(++_index === max) {
                                                    resolve({ groups });
                                                }
                                            });
                                    });
                                });
                    });
                });
    });
};

exports.changeFavorites = (groups) => {
    return new Promise((resolve, reject) => {
        groups.forEach((group) => {
            group.items.forEach((item, index) => {
                db.run(`UPDATE favorites_items
                        SET group_id=?, _index=?
                        WHERE id=?`, 
                [group.id, index, item.id],
                (run, err) => {
                    if(err) return reject({ error: SERVER_ERROR });

                    resolve({});
                });
            });
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