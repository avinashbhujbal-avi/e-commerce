const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  image: 
  { type: String, 
    default: "/images/default-product.jpg"
  
  },
  name: {
     type: String, 
     
     required: true
     },
  price: 
  { type: Number,
    
    required: true
   },
  discount: 
  { type: Number,
     default: 0
     },
  description: 
  { type: String,
     required: true
     },
  owner: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'owner', 
     required: true
     },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("product", productSchema);