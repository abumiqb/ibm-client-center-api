module.exports = function(app) {

    var loginns = require('../controllers/loginn.controller.js');
    
    // Authenticate
    app.post('/loginn', loginns.authenticate);

    // Create a new Loginn
    //app.post('/loginn', loginns.create);

     //Retrieve all Loginns
    app.get('/loginn', loginns.findAll);

    // Retrieve a single Note with loginnId
    app.get('/loginn/:loginnId', loginns.findOne);

    // Update a Loginn with loginnId
    app.put('/loginn/:loginnId', loginns.update);

    // Delete a Loginn with loginnId
    app.delete('/loginn/:loginnId', loginns.delete);
}