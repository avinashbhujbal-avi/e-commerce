const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authJWT, ensureUser } = require("../middlewares/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/home", authJWT, ensureUser, userController.getHome);
router.get("/profile", authJWT, ensureUser, userController.getProfile);
router.get("/cart", authJWT, ensureUser, userController.getCart);
router.post("/cart/add", authJWT, ensureUser, userController.addToCart);
router.post("/order/create", authJWT, ensureUser, userController.createOrder);
router.get("/logout", authJWT, userController.logout);

module.exports = router;