const jwt = require("jsonwebtoken");
const Owner = require("../models/owner-model"); // Add this import

const authJWT = async (req, res, next) => { // Make it async
  const token = req.cookies.token;
  
  if (!token) {
    req.flash("error", "Please login first");
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch the complete owner from database
    const owner = await Owner.findById(decoded.id);
    if (!owner) {
      res.clearCookie("token");
      req.flash("error", "User not found");
      return res.redirect("/login");
    }
    
    req.user = owner; // Set the full owner object, not just decoded token
    next();
  } catch (err) {
    console.error('JWT Error:', err);
    res.clearCookie("token");
    req.flash("error", "Session expired");
    res.redirect("/login");
  }
};

const ensureUser = (req, res, next) => {
  if (req.user && !req.user.gstin) {
    return next();
  }
  req.flash("error", "Please login as user");
  res.redirect("/login");
};

const ensureOwner = (req, res, next) => {
  if (req.user && req.user.gstin) {
    return next();
  }
  req.flash("error", "Please login as owner");
  res.redirect("/login");
};

module.exports = { authJWT, ensureUser, ensureOwner };