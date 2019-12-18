const fs = require("fs");
const databaseControler = require("./DataBases/databaseControler");
const currentVersion = 217;
const picturesData = [];

module.exports.getPicturesByLanguage = function(language) {
    
     let result = { }
     picturesData.forEach((pictureData) => {
          if(pictureData.language === language)
          {
               result = pictureData.pictures;
               return;
          }
     });
     return result;
}

module.exports.currentVersion = currentVersion;

module.exports.reset = function() {
     picturesData = [];
     databaseControler.getAllLanguages((languages) => {
          languages.forEach((language) => {
               let pictureData = { };
               pictureData.language = language;
               databaseControler.getPicturesByLanguage(language, (result) => {
                    result.forEach((item) => {
                         item.icon = readFileOnlyData(item.icon);
                    });
                    pictureData.pictures = result;
                    picturesData.push(pictureData);
               });
          });
     })
}


function readFileOnlyData(filePath)
{
     let fullFilepath = __dirname + "/../../icons/" + filePath;
     console.log(fullFilepath);
     if(filePath == undefined || filePath == null || !fs.existsSync(fullFilepath))
          return "";
     let buffer = fs.readFileSync(fullFilepath);;
     let result = "";
     for(let i = 0; i < buffer.byteLength; i++)
     {
          result += String.fromCharCode(buffer.readUInt8(i));
     }
     return result;
}