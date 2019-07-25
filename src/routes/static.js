const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
   res.send("Welcom to Bloccit! ");
});

module.exports = router;