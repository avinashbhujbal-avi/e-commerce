const Owner = require("../models/owner-model");
const Product = require("../models/product-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ownerController = {



  //register
  register: async (req, res) => {
    const { fullname, email, password, gstin } = req.body;

    const existingOwner = await Owner.findOne();
    if (existingOwner) {
      req.flash("error", "Owner registration is closed");
      return res.redirect("/signup");
    }

    try {
      const exists = await Owner.findOne({ email });
      if (exists) {
        req.flash("error", "Owner already registered");
        return res.redirect("/signup");
      }

      const hash = await bcrypt.hash(password, 10);
      const owner = await Owner.create({ fullname, email, password: hash, gstin });

      const token = jwt.sign(
        { id: owner._id, email: owner.email, gstin: owner.gstin },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("token", token, { httpOnly: true });
      req.flash("success", "Owner registered successfully!");
      res.redirect("/owner/dashboard");

    } catch (error) {
      req.flash("error", "Server error");
      res.redirect("/signup");
    }
  },



  //login
  login: async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const owner = await Owner.findOne({ email });
      if (!owner) {
        req.flash("error", "Owner not found");
        return res.redirect("/login");
      }

      const isMatch = await bcrypt.compare(password, owner.password);
      if (!isMatch) {
        req.flash("error", "Invalid credentials");
        return res.redirect("/login");
      }

      const token = jwt.sign(
        { id: owner._id, email: owner.email, gstin: owner.gstin },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("token", token, { httpOnly: true });
      req.flash("success", "Owner login successful!");
      res.redirect("/owner/dashboard");

    } catch (err) {
      req.flash("error", "Server error");
      res.redirect("/login");
    }
  },

  //getdashboard

 
  //product

  // In your createProduct function
createProduct: async (req, res) => {
  try {
    const { name, price, discount, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "/images/default-product.jpg";
    
    console.log('=== CREATE PRODUCT DEBUG ===');
    console.log('Request file:', req.file);
    console.log('Image path:', image);
    console.log('User ID:', req.user._id);
    console.log('=== END DEBUG ===');
    
    await Product.create({
      name,
      price: parseInt(price),
      discount: parseInt(discount) || 0,
      description,
      image,
      owner: req.user._id
    });

    req.flash("success", "Product created successfully!");
    res.redirect("/owner/dashboard");
  } catch (error) {
    console.error("Create product error:", error);
    req.flash("error", "Failed to create product");
    res.redirect("/owner/dashboard");
  }
},

// In your getDashboard function
getDashboard: async (req, res) => {
  try {
    console.log('=== DASHBOARD DEBUG ===');
    console.log('req.user:', req.user);
    
    // Use req.user._id (MongoDB ObjectId) instead of req.user.id
    const products = await Product.find({ owner: req.user._id });
    
    console.log('Products found:', products.length);
    res.render("owner-dashboard", { products, user: req.user });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.render("owner-dashboard", { products: [], user: req.user });
  }
},
//delete
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      await Product.findByIdAndDelete(id);
      req.flash("success", "Product deleted successfully!");
      res.redirect("/owner/dashboard");
    } catch (error) {
      req.flash("error", "Failed to delete product");
      res.redirect("/owner/dashboard");
    }
  },
//logout
  logout: (req, res) => {
    res.clearCookie("token");
    req.flash("success", "Logged out successfully");
    res.redirect("/login");
  }
};

module.exports = ownerController;