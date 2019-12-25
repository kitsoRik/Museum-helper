const fs = require("fs");
const path = require("path");
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database(path.resolve(__dirname, "../../databases/nice.db"));


module.exports.addPicture = function (picture, callback) {
     db.all(`INSERT INTO pictures (name,description,qrcode,icon_path) 
     VALUES (?, ?, ?, 'unknown.jpg')`,
          [
               picture.title,
               picture.description,
               picture.qrcode
          ], (err, row) => {
               db.all(`SELECT * FROM pictures ORDER BY id DESC LIMIT 1`, (err, row) => {
                    callback(row[0]);
               })
          });
}

module.exports.deletePicture = function (id, callback) {
     db.all(`DELETE FROM pictures WHERE id=?`, [id], (err, row) => {
          if (err) callback(false);
          else callback(true);
     });
}

module.exports.getPictures = function (callback) {
     let pictures = [];
     db.all("SELECT * FROM pictures", (err, rows) => {
          rows.forEach((row) => {
               let picture = {
                    id: row.id,
                    name: row.name,
                    description: row.description,
                    qrcode: row.qrcode,
                    iconPath: row.icon_path
               }
               pictures.push(picture);
          });
          callback(pictures);
     });
}

module.exports.getPictureInfo = function (id, callback) {
     let pictureInfo = [];

     db.all(`SELECT * FROM picturesInfo WHERE id=?`, [id], (err, rows) => {
          rows.forEach((row) => {
               pictureInfo.push(row);
          });
          callback(pictureInfo);
     });
}

module.exports.savePicture = function (picture, pictureInfo, callback) {
     db.all(`UPDATE pictures 
     SET name=?, 
          description=?,
          qrcode=? WHERE id=?`,
          [
               picture.name,
               picture.description,
               picture.qrcode,
               picture.id,

          ], () => {
               db.all(`SELECT id, language FROM picturesInfo WHERE id=${picture.id}`, (err, data) => {
                    for (let i = 0; i < pictureInfo.length; i++) {
                         if (data.map((p) => p.language).indexOf(pictureInfo[i].language) != -1) {
                              db.all(`UPDATE picturesInfo
                              SET language=?, 
                              title=?,
                              description=? 
                              WHERE id=? AND language=?`,
                                        [
                                             pictureInfo[i].language,
                                             pictureInfo[i].title,
                                             pictureInfo[i].description,
                                             picture.id,
                                             pictureInfo[i].language
                                        ], (err) => {
                                             // console.log(err);
                                             global.update(() => {
                                                  callback();
                                             });
                                        });
                              
                         } else {
                              db.all(`INSERT INTO picturesInfo
                         (id, language, title, description)
                         VALUES (?, ?, ?, ?)`,
                                   [
                                        picture.id,
                                        pictureInfo[i].language,
                                        pictureInfo[i].title,
                                        pictureInfo[i].description
                                   ], (err) => {
                                        //console.log(err);
                                        global.update(() => {
                                             callback();
                                        });
                                   });
                         }
                    }
               })
          });
}

module.exports.uploadIcon = function (id, iconPath, callback) {
     db.all(`UPDATE pictures SET icon_path='${iconPath}' WHERE id=${id}`, (err) => {
          callback(iconPath);
     });
}

module.exports.deleteIcon = function (id, callback) {
     db.all(`UPDATE pictures SET icon_path=? WHERE id=?`, [
          null,
          id
     ], (err) => {
          callback(true);
     });
}

module.exports.save = function (callback) {
     let id = global.currentUpdate.id + 1;
     let date = new Date().getSeconds();
     db.all(`INSERT INTO updates (id, date) VALUES (${id}, ${date})`, () => {
          global.update(() => {
               if (callback)
                    callback();
          });
     });
}

module.exports.getLastUpdate = function (callback) {
     db.all("SELECT * FROM updates ORDER BY id DESC LIMIT 1", (err, row) => {
          callback(row[0]);
     });
}

module.exports.getPicturesForApp = function (callback) {
     let pictures = [];
     db.all("SELECT * FROM pictures", (err, rows) => {
          let length = rows.length;
          rows.forEach((row, index) => {
               let id = row.id;
               let qrcode = row.qrcode;
               let iconPath = row.icon_path;
               let name = row.name;
               let picture = {
                    id: id,
                    name: name,
                    qrcode: qrcode,
                    icon: readFileOnlyData(iconPath)
               }
               let languageDiff = [];
               db.all(`SELECT * FROM picturesInfo WHERE id=${id} `, (err, rows) => {
                    rows.forEach((row) => {
                         let l = {
                              id: row.id,
                              language: row.language,
                              title: row.title,
                              description: row.description,
                         }
                         languageDiff.push(l);
                    });
                    if (rows.length != 0) {
                         picture.languages = languageDiff;
                         pictures.push(picture);
                    }
                    if (index == length - 1)
                         callback(pictures)
               });
          });
     })
}

function readFileOnlyData(filePath) {
     let fullFilepath = __dirname + "/../../icons/" + filePath;
     if (filePath == undefined || filePath == null || filePath == "" || !fs.existsSync(fullFilepath))
          return "";
     let buffer = fs.readFileSync(fullFilepath);;
     let result = "";
     for (let i = 0; i < buffer.byteLength; i++) {
          result += String.fromCharCode(buffer.readUInt8(i));
     }
     return result;
}