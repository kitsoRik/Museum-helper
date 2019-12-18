const picturesControler = require("./scripts/picturesControler");
const bodyParser = require("body-parser");

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

app.post("/", bodyParser.json(), (req, res) => {
     let result = processBody(req.body);

     res.send(result);
});

server.listen(3001, () => {
     console.log("Listening 3000 port...");
})

pictures.reset();

function processBody(body)
{
     let version = body.version;

     if(body.version == undefined)
          return { version: picturesControler.currentVersion };

     if(version >= picturesControler.currentVersion)
          return { version: version };
     let result = {
          version: picturesControler.currentVersion,
          pictures: picturesControler.getPicturesByLanguage("ua")
     }

     return result;
}
