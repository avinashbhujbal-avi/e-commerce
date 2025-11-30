const Owner = require("../models/owner-model");

const authController = {
  showSplash: (req, res) => {
    res.render("splash");
  },

  showLogin: (req, res) => {
    res.render("login");
  },

  showSignup: async (req, res) => {
    const ownerExists = await Owner.findOne();
    res.render("signup", { ownerExists: !!ownerExists });
  }
};

module.exports = authController;