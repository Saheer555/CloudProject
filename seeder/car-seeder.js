var Car = require('../models/Car');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/wheelsandrides', { useNewUrlParser: true, useUnifiedTopology: true });

var cars = [
    new Car({
        'brand': 'Toyota',
        'carmodel': 'Yaris',
        'imagePath': 'https://imgd.aeplcdn.com/1056x594/cw/ec/32943/Toyota-Yaris-Exterior-125464.jpg',
        'description': 'The Toyota Yaris has 1 Petrol Engine on offer.\nThe Petrol engine is 1496 cc.\nIt is available with the Manual and Automatic transmission.\nDepending upon the variant and fuel type the Yaris has a mileage of 17.1 to 17.8 kmpl.\nThe Yaris is a 5 seater Sedan and has a length of 4425mm, width of 1730mm and a wheelbase of 2550mm.',
        'price': 5500.00
    }),

    new Car({
        'brand': 'Tesla',
        'carmodel': 'Model X',
        'imagePath': 'https://i.pinimg.com/originals/cd/48/38/cd483869c3df9521a39e9bd134ab6a9d.jpg',
        'description': 'The Tesla Model X has 1 Electric Engine on offer.\nIt is available with the Automatic transmission.\nThe Model X has a length of 5036mm, width of 2270mm and a wheelbase of 2964mm.',
        'price': 12500.00
    })
];


var done = 0;
for (var i = 0; i < cars.length; i++) {
    cars[i].save(function (err, res) {
        done++;
        if (done == cars.length)
            exit();
    });
}

function exit() {
    mongoose.disconnect();
}