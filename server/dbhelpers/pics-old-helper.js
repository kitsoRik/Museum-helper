const { db, serverError } = require("../statics");


exports.getOldPicturesByMuseumIdAndReleaseId = (museumid, updateId) => 
    new Promise((resolve, reject) => {
    db.all(`SELECT * FROM pictures_old
            WHERE museum_id=? AND release_id=?`,
    [museumid, updateId], (err, pictures) => {
        console.log(err);
        if(err) return reject(serverError());

        resolve(pictures);
    });
});