var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CarSchema = new Schema({
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
    'carregnumber': { 
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

const Car = mongoose.model('Car', CarSchema);
module.exports = Car;
