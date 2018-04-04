module.exports = function(app) {

    var bookings = require('../controllers/booking.controller.js');

    // Create a new Booking
    app.post('/booking', bookings.create);

    // Retrieve all Bookings
    app.get('/booking', bookings.findAll);

    // Retrieve a single Note with bookingId
    app.get('/booking/:bookingId', bookings.findOne);

    // Update a Booking with bookingId
    app.put('/booking/:bookingId', bookings.update);

    // Delete a Booking with bookingId
    app.delete('/booking/:bookingId', bookings.delete);
}