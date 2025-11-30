const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/ownerController");
const { authJWT, ensureOwner } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.post("/register", ownerController.register);
router.post("/login", ownerController.login);
router.get("/dashboard", authJWT, ensureOwner, ownerController.getDashboard);
router.post("/products", authJWT, ensureOwner, upload.single('image'), ownerController.createProduct);
router.post("/products/:id/delete", authJWT, ensureOwner, ownerController.deleteProduct);
router.get("/logout", authJWT, ownerController.logout);

module.exports = router;