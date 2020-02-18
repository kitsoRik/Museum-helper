const fs = require("fs");
const path = require("path");
const sha256 = require("js-sha256").sha256;

exports.parseJStoSQLQ = (obj, prefix = '') => {
    let keys = Object.keys(obj);

    let resultKeys = "";
    let resultValues = [];

    for(let i = 0; i < keys.length; i++) {
        let key = keys[i];
        resultKeys += ` ${prefix ? `${prefix}.` : ''}${key}=?`;
        resultValues.push(obj[key]);

        if(i !== keys.length - 1) resultKeys += ' AND '
    }
    
    return { resultKeys, resultValues };
}

exports.processFileToFilename = (file) => {
    return new Promise((resolve, reject) => {
        const oldPath = path.join(__dirname, "/uploads/", file.filename);
        const newPath = path.join(__dirname, "/../icons/", file.filename);
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