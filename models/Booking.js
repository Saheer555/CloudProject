var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookingSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    carid: {
        type: String,
        required: true
    },
    pickupdate: {
        type: String,
        required: true
    },
    pickuppoint: {
        type: String,
        required: true
    },
    dropdate: {
        type: String,
        required: true
    },
    droppoint: {
        type: String,
        required: true
    },
    fuelpackage: {
        type: String,
        required: true
    },
    totalprice: {
        type: String,
        required: true
    },
    diffdays: {
        type: String,
        required: true
    },
    carmodel: {
        type: String,
        required: true
    },
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;
