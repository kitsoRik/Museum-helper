const fs = require("fs");
const path = require("path");

exports.parseJStoSQLQ = (obj) => {
    let keys = Object.keys(obj);

    let resultKeys = "";
    let resultValues = [];

    for(let i = 0; i < keys.length; i++) {
        let key = keys[i];
        resultKeys += ` ${key}=?`;
        resultValues.push(obj[key]);

        if(i !== keys.length - 1) resultKeys += ', '
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