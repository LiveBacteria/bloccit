const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
   res.send("Welcome to Bloccit! ");
});

router.get("/test", (req, res, next) => {
   res.send("<a href='https://google.com' title='Google'>Test</a>")
});

module.exports = router;