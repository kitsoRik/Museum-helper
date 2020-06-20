const express = require("express");
const app = express();
const subdomain = require("./modules/subdomain");
const path = require("path");

app.set("subdomain offset", 0);

app.use(
	"/static/pictureIcons",
	express.static(path.join(__dirname, "/../icons"))
);
app.use(subdomain("api", require("./subdomains/api")));
app.use(require("./subdomains/_"));

app.listen(80, () => console.log("LISTENING http port..."));
