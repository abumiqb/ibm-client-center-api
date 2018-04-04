var mongoose = require('mongoose');

var RomSkjema = mongoose.Schema({
    "navn": String,

}, {
    //timestamps: true
});

RomSkjema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Rom', RomSkjema);
