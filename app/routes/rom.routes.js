module.exports = function(app) {

    var roms = require('../controllers/rom.controller.js');

    // Create a new Rom
    app.post('/rom', roms.create);

    // Retrieve all Roms
    app.get('/rom', roms.findAll);

    // Retrieve a single Note with romId
    app.get('/rom/:romId', roms.findOne);

    // Update a Rom with romId
    app.put('/rom/:romId', roms.update);

    // Delete a Rom with romId
    app.delete('/rom/:romId', roms.delete);
}