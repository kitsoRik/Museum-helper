const SERVER_ERROR = "SERVER_ERROR";

const db = require("../statics").db;
const PicsHelp = require("./pictures-helper");

exports.getFavoritesGroups = (id) => new Promise((resolve, reject) => {
    db.all(`SELECT id, name, description 
    FROM favorites_groups
    WHERE user_id=?
    ORDER BY _index ASC`, 
    [id], (err, groups) => {
        if(err) return reject({ error: SERVER_ERROR });
        groups.push({id: -1, name: "Other", description: "" });
        resolve({groups});
    });
});

exports.getItemsInGroups = ({groups}) => new Promise((resolve, reject) => {
    let allItems = [];
    let _index = 0;
    groups.forEach((g, index) => {
        db.all(`SELECT id, picture_id pictureId
                FROM favorites_items
                WHERE group_id=?
                ORDER BY _index ASC`, 
        [g.id],(err, items) => { 
            if(err) return reject({ error: SERVER_ERROR });
            allItems = allItems.concat(items);
            groups[index].items = items;
            if(++_index === groups.length) {
                resolve({items: allItems, groups});
            }
        });
    })
});

exports.getPictureForItems = ({items, groups}) => new Promise((resolve, reject) => {
    let _index = 0;
    if(items.length === 0) return resolve({groups});
    items.forEach(i => {
        PicsHelp.getPictureById(i.pictureId)
            .then(picture => {
                i.picture = picture;
                if(++_index === items.length) {
                    resolve({ groups });
                }
            }).catch(({ error }) => {
                reject(error);
            });
        });
});

exports.addFavoritePicture = (pictureId) => new Promise((resolve, reject) => {
    db.run(`INSERT INTO favorites_items (group_id, picture_id, _index)
            VALUES (-1, ?, 0)`, 
    [pictureId], (run, err) => {
        if(err) return reject({ error: SERVER_ERROR });

        resolve({});
    })
});

exports.deleteFavoritePicture = (id) => new Promise((resolve, reject) => {
    db.run(`DELETE FROM favorites_items WHERE picture_id=?`, 
    [id], (run, err) => {
        if(err) return reject({ error: SERVER_ERROR });

        resolve({});
    })
});

exports.addFavoriteGroup = (userId, name, description) => new Promise((resolve, reject) => {
    db.run(`INSERT INTO favorites_groups (user_id, name, description)
            VALUES (?, ?, ?)`, 
    [userId, name, description], (run, err) => {
        if(err) return reject({ error: SERVER_ERROR });

        resolve({});
    })
});

exports.getLastFavoriteGroupByData = (name, description) => new Promise((resolve, reject) => {
    db.get(`SELECT id, name, description 
            FROM favorites_groups
            WHERE name=? AND description=?
            ORDER BY id DESC
            LIMIT 1`,
    [name, description], (err, group) => {
        if(err) return reject({ error: SERVER_ERROR });
        
        resolve({ 
            addedGroup:{
                ...group,
                items: []
            }
        });
    });
});

exports.deleteFavoriteGroup = (id) => new Promise((resolve, reject) => {
    db.run(`DELETE FROM favorites_groups
            WHERE id=?`, 
    [id], (run, err) => {
        if(err || run) return reject({ error: SERVER_ERROR });
        resolve({});
    });
});

exports.clearFavoriteItemsByGroupId = (id) => new Promise((resolve, reject) => {
    db.run(`UPDATE favorites_items
            SET group_id=?
            WHERE group_id=?`,
    [-1, id], (run, err) => {
        if(err || run) return reject({ error: SERVER_ERROR });

        resolve({});
    });
});