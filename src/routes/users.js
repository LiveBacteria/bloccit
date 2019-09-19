const express = require("express");
const router = express.Router();
const validation = require("./validations");

const userController = require("../controllers/userController");

router.get("/users/sign_up", userController.sign_up);
router.post("/users", validation.validateUsers, userController.create);

module.exports = router;