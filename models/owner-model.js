const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema(
  {
  fullname: { 
    type: String,
     required: true
     },
  email: {
    type: String,
     unique: true,
      required: true
     },
  password: { 
    type: String,
     required: true
     },
  gstin: {
     type: String,
      required: true
     },
  products: [{
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'product' }],
  createdAt: { 
    type: Date,
     default: Date.now
     }
});

module.exports = mongoose.model("owner", ownerSchema);