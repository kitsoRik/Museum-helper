const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const databaseController = require("./scripts/dataBasesController");

const bodyParser = require("body-parser");

const siteRouter = require("./routes/site");
const appRouter = require("./routes/app");

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