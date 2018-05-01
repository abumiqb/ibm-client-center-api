var mongoose = require('mongoose');

var LoginnSkjema = mongoose.Schema({
    "brukernavn": String,
    "passord": String,

}, {
    //timestamps: true
});

LoginnSkjema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Loginn', LoginnSkjema);
