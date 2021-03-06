var mongoose = require('mongoose');

var BookingSkjema = mongoose.Schema({
    "navn": String,
    "firma": String,
    "email": String,
    "phone": Number,
    "antall": Number,
    "dato": String,
    "starttid": String,
    "slutttid": String,
    "opportunityNr": String,
    "room": String,
    "approved": Boolean,
}, {
    //timestamps: true
});

BookingSkjema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Booking', BookingSkjema);
