const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("Q:\\museum-helper\\databases\\nice.db");

const columns = [];

module.exports.columns = columns;

module.exports.getAllLanguages = function(callback) {
     const languages = [];
     db.all("SELECT DISTINCT language FROM mytable", (err, rows) => {
          rows.forEach((item) => {
               const language = item.language;
               languages.push(language);
          });
          console.log("Read all languages");
          callback(languages);
     });
}

module.exports.getPicturesByLanguage = function(language, callback) {
     db.all(`SELECT * FROM mytable WHERE language='${language}'`, (err, rows) => {
          let pictures = [];

          rows.forEach((row) => {
               const picture = { };
               columns.forEach((columnName) => {
                    const data = row[columnName];

                    picture[columnName] = data;
               });
               pictures.push(picture);
          });

          console.log(`Read pictures by language ${language}`);
          callback(pictures);
     })

}

db.all("PRAGMA TABLE_INFO(mytable)", (err, rows) => {
     rows.forEach((row) => {
          columns.push(row.name);
     });
});