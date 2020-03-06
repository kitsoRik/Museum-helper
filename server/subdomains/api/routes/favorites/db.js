const { serverError, db } = require("../../statics");
const { getPictureById } = require("../pictures/db");

exports.addFavoritePicture = (pictureId) => new Promise((resolve, reject) => {
    db.run(`INSERT INTO favorites_items (group_id, picture_id, _index)
            VALUES (-1, ?, 0)`, 
    [pictureId], (run, err) => {
        if(err || run) return reject(serverError());
        resolve();
    })
});

exports.deleteFavoritePictureByPictureId = (id) => new Promise((resolve, reject) => {
    db.run(`DELETE FROM favorites_items WHERE picture_id=?`, 
    [id], (run, err) => {
        if(err || run) return reject(serverError());
        resolve();
    })
});

exports.getFavorites = (id) => new Promise((resolve, reject) => {
    getFavoritesGroups(id)
    .then(getItemsInGroups)
    .then(getPictureForItems)
    .then(resolve)
    .catch(reject);
});

exports.addFavotireGroup = (userId, name, description) => new Promise((resolve, reject) => {
    addFavoriteGroup(userId, name, description)
        .then(() => getLastFavoriteGroupByData(name, description))
        .then(resolve)
        .catch(reject);
});

exports.deleteFavotireGroup = (id) => new Promise((resolve, reject) => {
    deleteFavoriteGroup(id)
        .then(() => clearFavoriteItemsByGroupId(id))
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
                            if(++_index === max) resolve();
                        });
                    });
                });
            }
        });
    });
};


const getFavoritesGroups = (id) => new Promise((resolve, reject) => {
    db.all(`SELECT id, name, description 
    FROM favorites_groups
    WHERE user_id=?
    ORDER BY _index ASC`, 
    [id], (err, groups) => {
        if(err) return reject(serverError());
        groups.push({id: -1, name: "Other", description: "" });
        resolve(groups);
    });
});

const getItemsInGroups = (groups) => new Promise((resolve, reject) => {
    let allItems = [];
    let _index = 0;
    groups.forEach((g, index) => {
        db.all(`SELECT id, picture_id pictureId
                FROM favorites_items
                WHERE group_id=?
                ORDER BY _index ASC`, 
        [g.id],(err, items) => { 
            if(err) return reject(serverError());
            allItems = allItems.concat(items);
            groups[index].items = items;
            if(++_index === groups.length) {
                resolve({items: allItems, groups});
            }
        });
    })
});

const getPictureForItems = ({items, groups}) => new Promise((resolve, reject) => {
    let _index = 0;
    if(items.length === 0) return resolve({groups});
    items.forEach(i => {
        require("../pictures/db").getPictureById(i.pictureId)
        // bux if import { getPictureById } = require("../pictures/db")
            .then(picture => {
                i.picture = picture;
                if(++_index === items.length) {
                    resolve(groups);
                }
            }).catch(reject);
        });
});

const addFavoriteGroup = (userId, name, description) => new Promise((resolve, reject) => {
    db.run(`INSERT INTO favorites_groups (user_id, name, description)
            VALUES (?, ?, ?)`, 
    [userId, name, description], (run, err) => {
        if(err) return reject(serverError());

        resolve();
    })
});

const getLastFavoriteGroupByData = (name, description) => new Promise((resolve, reject) => {
    db.get(`SELECT id, name, description 
            FROM favorites_groups
            WHERE name=? AND description=?
            ORDER BY id DESC
            LIMIT 1`,
    [name, description], (err, group) => {
        if(err) return reject(serverError());
        
        resolve({
                ...group,
                items: []
        });
    });
});

const deleteFavoriteGroup = (id) => new Promise((resolve, reject) => {
    db.run(`DELETE FROM favorites_groups
            WHERE id=?`, 
    [id], (run, err) => {
        if(err || run) return reject(serverError());
        resolve();
    });
});

const clearFavoriteItemsByGroupId = (id) => new Promise((resolve, reject) => {
    db.run(`UPDATE favorites_items
            SET group_id=?
            WHERE group_id=?`,
    [-1, id], (run, err) => {
        if(err || run) return reject(serverError());

        resolve();
    });
});