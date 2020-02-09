const db = require("../statics").db;

exports.getFavoritesGroups = (id) => new Promise((resolve, reject) => {
    db.all(`SELECT id, name, description 
    FROM favorites_groups
    WHERE user_id=?
    ORDER BY _index ASC
    `, [id], (err, groups) => {
        if(err) return reject({ error: SERVER_ERROR });
        result = [...groups];
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
    items.forEach(i => {
        db.get(`SELECT id, name, description, icon_name iconName 
                FROM pictures
                WHERE id=?`, 
        [i.pictureId], (err, picture) => {
            if(err) return reject({ error: SERVER_ERROR });
            i.picture = picture;

            if(++_index === items.length) {
                resolve(groups);
            }
        });
    });
});