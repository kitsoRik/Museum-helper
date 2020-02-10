const SERVER_ERROR = "SERVER_ERROR";

const db = require("../statics").db;
const PicHelp = require("./picture-helper");

exports.getFavoritesGroups = (id) => new Promise((resolve, reject) => {
    db.all(`SELECT id, name, description 
    FROM favorites_groups
    WHERE user_id=?
    ORDER BY _index ASC
    `, [id], (err, groups) => {
        if(err) return reject({ error: SERVER_ERROR });
        groups.push({id: -1, name: "Other", description: "" });
        resolve(groups);
    });
});

exports.getItemsInGroups = (groups) => new Promise((resolve, reject) => {
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
    if(items.length === 0) return resolve(groups);
    items.forEach(i => {
        PicHelp.getPictureById(i.pictureId)
            .then(picture => {
                i.picture = picture;
                if(++_index === items.length) {
                    resolve(groups);
                }
            }).catch(({ error }) => {
                reject(error);
            });
        });
});