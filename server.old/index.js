const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cookieParser = require("cookie-parser")
const databaseController = require("./scripts/dataBasesController");

const bodyParser = require("body-parser");

const siteRouter = require("./routes/site");
const appRouter = require("./routes/app");

app.use(cookieParser());


app.use(/.*/, (req, res, next) => {
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
     res.setHeader('Access-Control-Allow-Credentials', true);
     next();
});

app.use(bodyParser.json());
app.use(express.static(__dirname + "/../icons"));
app.use("/site", siteRouter);
app.use("/app", appRouter.router);

global.update = function(callback) {
     databaseController.getLastUpdate((data) => {
          global.currentUpdate = data;
          appRouter.update();
          if(callback)
               callback();
     });
}

databaseController.getLastUpdate((data) => {
     global.currentUpdate = data;
     global.update();
});

server.listen(3000, () => {
     console.log("Listening 3k port...");
});