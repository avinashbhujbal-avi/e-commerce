const User = require("../models/user-model");
const Product = require("../models/product-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = {
  register: async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
      const existing = await User.findOne({ email });
      if (existing) {
        req.flash("error", "Email already exists");
        return res.redirect("/signup");
      }

      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({ fullname, email, password: hash });

      const token = jwt.sign(
        { id: user._id, email: user.email }, 
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("token", token, { httpOnly: true });
      req.flash("success", "Registration successful!");
      res.redirect("/user/home");

    } catch (error) {
      req.flash("error", "Server error");
      res.redirect("/signup");
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        req.flash("error", "User not registered");
        return res.redirect("/signup");
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        req.flash("error", "Incorrect password");
        return res.redirect("/login");
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("token", token, { httpOnly: true });
      req.flash("success", "Welcome back!");
      res.redirect("/user/home");

    } catch (err) {
      req.flash("error", "Server error");
      res.redirect("/login");
    }
  },

getHome: async (req, res) => {
  try {
    // Simply fetch products - no demo creation
    const products = await Product.find().populate('owner').limit(10);
    
    res.render("home", { products, user: req.user });
  } catch (error) {
    console.error("Error:", error);
    res.render("home", { products: [], user: req.user });
  }
},

  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.render("profile", { user: req.user });
    } catch (error) {
      res.render("/profile", { user: req.user });
    }
  },

  addToCart: async (req, res) => {
    try {
      const { productId } = req.body;
      const user = await User.findById(req.user.id);
      
      const existingItem = user.cart.find(item => item.product.toString() === productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        user.cart.push({ product: productId, quantity: 1 });
      }
      
      await user.save();
      req.flash("success", "Product added to cart!");
      res.redirect("/user/home");
    } catch (error) {
      req.flash("error", "Failed to add to cart");
      res.redirect("/user/home");
    }
  },

  getCart: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate('cart.product');
      let total = 0;
      user.cart.forEach(item => {
        total += item.product.price * item.quantity;
      });
      
      res.render("cart", { cart: user.cart, total, user: req.user });
    } catch (error) {
      res.render("cart", { cart: [], total: 0, user: req.user });
    }
  },

  createOrder: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      user.cart = [];
      await user.save();
      
      res.render("order-success", { user: req.user });
    } catch (error) {
      req.flash("error", "Failed to create order");
      res.redirect("/cart");
    }
  },

  logout: (req, res) => {
    res.clearCookie("token");
    req.flash("success", "Logged out successfully");
    res.redirect("/login");
  }
};

module.exports = userController;