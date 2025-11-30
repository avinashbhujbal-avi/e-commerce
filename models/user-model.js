const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: { 
    type: String,
     required: true
     },
  email: { 
    type: String,
     unique: true,
      required: true
     },
  password: { type: String,
     required: true
     },
  cart: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
    quantity: { type: Number, default: 1 }
  }],
  createdAt: { 
    type: Date, 
    default: Date.now
   }
});

module.exports = mongoose.model("user", userSchema);