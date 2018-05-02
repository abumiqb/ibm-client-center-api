module.exports = function(app) {

    var briefings = require('../controllers/briefing.controller.js');

    // Create a new Briefing
    app.post('/briefing', briefings.create);

    // Retrieve all Briefings
    app.get('/briefing', briefings.findAll);

    // Retrieve a single Note with briefingId
    app.get('/briefing/:briefingId', briefings.findOne);

    // Update a Briefing with briefingId
    app.put('/briefing/:briefingId', briefings.update);

    // Delete a Briefing with briefingId
    app.delete('/briefing/:briefingId', briefings.delete);
}