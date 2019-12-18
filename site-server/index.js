const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const bodyParser = require("body-parser");

let pictures = [
     {
          id: 1,
          qrcode: "qwe",
          title: "Title1",
          description: "Text text text text",
          iconPath: "/Madonna.jpg"
     },
     {
          id: 2,
          qrcode: "qwe1",
          title: "Title2",
          description: "Text text text text",
          iconPath: "/Mona_Lisa.jpg"
     }
]

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.use(/.*/, (req, res, next) => {
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
     res.setHeader('Access-Control-Allow-Credentials', true);
     next();
});

app.post("/getPictures", (req, res) => {
     console.log("GetPictures");
     let sendPictures = [];
     for(let i = 0; i < 10; i++)
     pictures.forEach((picture) => {
          let sendPicture = {
               id: picture.id,
               qrcode: picture.qrcode,
               title: picture.title,
               description: picture.description.substr(0, 10),
               iconPath: picture.iconPath
          };

          sendPictures.push(sendPicture);
     });

     res.send(JSON.stringify(sendPictures));
});

app.post("/getPictureById", (req, res) => {
     let id = req.body.id;
     console.log("GetPictureById" + id);
     let sendPicture = pictures.find((p) => p.id == id);
     res.send(sendPicture);
});

server.listen(3000, () => {
     console.log("Listening 3k port...");
});