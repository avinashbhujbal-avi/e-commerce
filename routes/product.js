const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { authJWT } = require("../middlewares/auth");

router.get("/:id", authJWT, productController.getProductDetail);

module.exports = router;