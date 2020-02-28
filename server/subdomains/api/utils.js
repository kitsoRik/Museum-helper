const db = require("./statics").db;
const fs = require("fs");
const path = require("path");
const sha256 = require("js-sha256").sha256;

exports.parseJStoSQLQ = (obj, prefix = '') => {
    let keys = Object.keys(obj);

    let resultKeys = "";
    let resultValues = [];

    for(let i = 0; i < keys.length; i++) {
        let key = keys[i];
        resultKeys += ` ${prefix ? `${prefix}.` : ''}${correctKey(key)}=?`;
        resultValues.push(obj[key]);

        if(i !== keys.length - 1) resultKeys += ' AND '
    }
    
    return { resultKeys, resultValues };
}

exports.processFileToFilename = (file) => {
    return new Promise((resolve, reject) => {
        const oldPath = path.join(__dirname, "../../uploads/", file.filename);
        const newPath = path.join(__dirname, "/../../../icons/", file.filename);
        fs.rename(oldPath, newPath, () => {
            resolve(file.filename);
        });
    });
}

exports.hashPassword = (pass) => {
    let result = pass;
    for(let i = 0; i < 32; i++) {
        result = sha256(result);
    }
    return result;
}

exports.makeLink = () => makeString(512);


exports.createSesid = (id) => {
     const sesid = makeString(256);
     db.run(`INSERT INTO sesids (id, sesid)
            VALUES (?, ?)`, [id, sesid], (run, err) => {
                if(err) console.log(err);
            });

     return sesid;
}

const makeString = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 const correctKey = (key) => {
    for(let i = 0; i < key.length; i++) {
        const isUpp = key[i] === key[i].toUpperCase();
        if(isUpp) {
            const begin = key.slice(0, i);
            const end = key.slice(i + 1);

            key = begin + `_${key[i++].toLowerCase()}` + end;
        }
    }
    return key;
}