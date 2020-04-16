var Car = require('../models/Car');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/wheelsandrides', { useNewUrlParser: true, useUnifiedTopology: true });

var cars = [
    new Car({
        'brand': 'Toyota',
        'carmodel': 'Yaris',
        'imagePath': ['https://imgd.aeplcdn.com/1056x594/cw/ec/32943/Toyota-Yaris-Exterior-125464.jpg', "https://stimg.cardekho.com/images/carexteriorimages/630x420/Toyota/Yaris/7283/1579858168291/front-left-side-47.jpg", "https://static.toyotabharat.com/images/showroom/yaris/features/dual-tone-exterior-big.jpg"],
        'carregnumber': 'KA 51 MD 4173',
        'description': 'The Toyota Yaris has 1 Petrol Engine on offer.\nThe Petrol engine is 1496 cc.\nIt is available with the Manual and Automatic transmission.\nDepending upon the variant and fuel type the Yaris has a mileage of 17.1 to 17.8 kmpl.\nThe Yaris is a 5 seater Sedan and has a length of 4425mm, width of 1730mm and a wheelbase of 2550mm.',
        'price': 2500.00
    }),

    new Car({
        'brand': 'Tesla',
        'carmodel': 'Model X',
        'imagePath': ['https://i.pinimg.com/originals/cd/48/38/cd483869c3df9521a39e9bd134ab6a9d.jpg', "https://www.tesla.com/sites/tesla/files/curatedmedia/performance-hero%402.jpg", "https://i.ytimg.com/vi/aKra-KgUJIU/maxresdefault.jpg"],
        'carregnumber': 'MH 12 RN 1289',
        'description': 'The Tesla Model X has 1 Electric Engine on offer.\nIt is available with the Automatic transmission.\nThe Model X has a length of 5036mm, width of 2270mm and a wheelbase of 2964mm.',
        'price': 4500.00
    }),

    new Car({
        'brand': 'Hummer',
        'carmodel': 'H3',
        'imagePath': ["https://cimg2.ibsrv.net/ibimg/hgm/510x287-1/100/217/hummer-h3-black-edition_100217362.jpg", "https://cdn.motor1.com/images/mgl/B6ve/s1/2007-26158-hummer-h3-black-edition1.jpg", "http://autowpaper.com/images/hummer-h3-black-2.jpg"],
        'carregnumber': 'TS 09 UB 8902',
        'description': 'The Hummer H3 has 1 Petrol Engine on offer.\nThe Petrol engine is 3700 cc.\nIt is available with the transmission.\nThe H3 is a 5 seater SUV.',
        'price': 3500.00
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