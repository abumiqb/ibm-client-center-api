var mongoose = require('mongoose');

var BriefingSkjema = mongoose.Schema({
    "navn": String,
    "firma": String,
    "email": String,
    "phone": Number,
    "antall": Number,
    "dato": String,
    "starttid": String,
    "briefing": String,
    "approved": Boolean,
}, {
    //timestamps: true
});

BriefingSkjema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Briefing', BriefingSkjema);
