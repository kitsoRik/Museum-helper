const express = require("express");
const router = express.Router();

router.use(express.static(__dirname + "/"));

router.use("*", (req, res) => {
     res.sendFile(__dirname + "/index.html");
});

module.exports = router;