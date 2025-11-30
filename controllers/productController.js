const Product = require("../models/product-model");

const productController = {
  getProductDetail: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate('owner');
      if (!product) {

        req.flash("error", "Product not found");
        return res.redirect("/home");

      }
      
      res.render("product-detail", { product, user: req.user });

    } catch (error) {

      req.flash("error", "Product not found");

      res.redirect("/home");
      
    }
  }
};

module.exports = productController;