const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/", authController.showSplash);
router.get("/login", authController.showLogin);
router.get("/signup", authController.showSignup);

module.exports = router;