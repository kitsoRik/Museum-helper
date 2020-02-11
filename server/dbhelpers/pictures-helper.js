const SERVER_ERROR = "SERVER_ERROR";

const db = require("../statics").db;

exports.getPicturesPagesDataByRequest = 
    (userId, searchText = '', limit = 1, pageNumber) => new Promise((resolve, reject) => {
    db.get(`SELECT COUNT(id) as pagesCount
            FROM pictures
            WHERE user_id=? AND name LIKE ?`,
    [userId, `%${searchText}%`], (err, { pagesCount }) => {
        if(err) return reject({ SERVER_ERROR });
        resolve({ pagesCount: Math.round(pagesCount / limit), pageNumber })
    });
});

exports.getPictures = (id, searchText, sortedField, sortedType, limit, pageNumber) => new Promise((resolve, reject) => {
    
    const sortedFieldsTransform = (field) => {
        switch(field) {
            case 'created': return 'created_date';
            case 'changed': return 'changed_date';
            default: return field;
        }
    }
            
    const sortedQuery = sortedField === 'none' ? "" : 
        `ORDER BY p.${sortedFieldsTransform(sortedField)} ${sortedType}`;
    db.all(`SELECT p.id, p.name, p.description, p.qrcode,
            EXISTS (
                SELECT f.id 
                FROM favorites_items f 
                WHERE f.picture_id=p.id
                ) as favorite,
                ( SELECT icon_name FROM pictures_icons pi WHERE pi.picture_id=p.id ) as iconName
            FROM pictures p 
            WHERE p.user_id=? AND p.name LIKE ?
            ${sortedQuery}
            LIMIT ?, ? `,
        [id, `%${searchText}%`, (pageNumber - 1) * limit, limit], (err, pictures) => {
            if (err) return reject({ error: SERVER_ERROR });
            resolve(pictures);
        });
});