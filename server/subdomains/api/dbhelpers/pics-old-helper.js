const { db, serverError } = require("../statics");


exports.getOldPicturesByMuseumIdAndReleaseId = ( searchText, sortedField, sortedType, museumId, limit, pageNumber, updateId) => 
    new Promise((resolve, reject) => {
            
    const sortedFieldsTransform = (field) => {
        switch(field) {
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
        console.log(err);
        if(err) return reject(serverError());

        resolve(pictures);
    });
});