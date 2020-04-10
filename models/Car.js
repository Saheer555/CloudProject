var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    'brand': { 
        type: String,
        required: true 
    },
    'carmodel': { 
        type: String,
        required: true 
    },
    'imagePath': { 
        type: String, 
        required: true 
    },
    'description': { 
        type: String, 
        required: true 
    },
    'price': { 
        type: Number, 
        required: true
     }
});

const Product = mongoose.model('Car', ProductSchema);
module.exports = Product;
