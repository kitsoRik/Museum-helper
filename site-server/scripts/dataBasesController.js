const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("Q:\\museum-helper\\databases\\nice.db");

module.exports.getShortPicturesByLogin = function(login, callback) {
    // if(!login || login.length === 0)
      //    return console.log("NULL" + login);

     let pictures = [];
     db.all("SELECT * FROM mytable", (err, rows) => {
          rows.forEach((row) => {
               let picture = {
                    qrcode: row.qrcode,
                    id: row.id,
                    title: row.title,
                    description: row.text,
                    iconPath: row.icon
               }

               pictures.push(picture);
          });
          callback(pictures);
     });
}
