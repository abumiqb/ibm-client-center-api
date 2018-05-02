var Loginn = require('../models/loginn.model.js');

exports.authenticate = function(req, res)
{
    // Authenticate admin login username
    
    Loginn.find({brukernavn: req.body.username, passord: req.body.password}, function(err, loginn) 
    {
        if(err) {
            //console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(403).send({melding: "Loginn ikke funnet med id " + req.params.loginnId});
            }
            return res.status(403).send({melding: "Error retrieving loginn with id " + req.params.loginnId});
        }

        if(!loginn) {
            return res.status(403).send({melding: "Loginn ikke funnet med id " + req.params.loginnId});
        }
        
        if(loginn.length > 0)
            res.send(loginn);
        else
            return res.status(401).send({melding: "Login feilet!"});
    });

};

exports.create = function(req, res)
{
    // Create and Save a new loginn

    if(!req.body.username) {
        return res.status(400).send({melding: "Loginn can not be empty"});
    }

    var loginn = new Loginn({brukernavn: req.body.username,
                       passord: req.body.password,
        
    });

    loginn.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({melding: "Error ny loginn"});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res)
{
    // Retrieve and return all loginns floginn the database.

    Loginn.find(function(err, loginn){
        if(err) {
            console.log(err);
            res.status(500).send({melding: "Error fetch loginn"});
        } else {
            res.send(loginn);
        }
    });

};

exports.findOne = function(req, res)
{
    // Find a single loginn with a loginnId

    Loginn.findById(req.params.loginnId, function(err, loginn) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({melding: "Loginn ikke funnet med id " + req.params.loginnId});
            }
            return res.status(500).send({melding: "Error retrieving loginn with id " + req.params.loginnId});
        }

        if(!loginn) {
            return res.status(404).send({melding: "Loginn ikke funnet med id " + req.params.loginnId});
        }

        res.send(loginn);
    });

};

exports.update = function(req, res)
{
    // Update a loginn identified by the loginnId in the request

    Loginn.findById(req.params.loginnId, function(err, loginn) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Loginn ikke finnet med id " + req.params.loginnId});
            }
            return res.status(500).send({message: "Error finding loginn with id " + req.params.loginnId});
        }

        if(!loginn) {
            return res.status(404).send({message: "Loginn not found with id " + req.params.loginnId});
        }

        loginn.brukernavn = req.body.brukernavn;
        loginn.passord = req.body.passord;



        loginn.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update loginn with id " + req.params.loginnId});
            } else {
                res.send(data);
            }
        });
    });

};

exports.delete = function(req, res)
{
    // Delete a loginn with the specified loginnId in the request

    Loginn.findByIdAndRemove(req.params.loginnId, function(err, loginn) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Loginn not found with id " + req.params.loginnId});
            }
            return res.status(500).send({message: "Could not delete loginn with id " + req.params.loginnId});
        }

        if(!loginn) {
            return res.status(404).send({message: "Loginn not found with id " + req.params.loginnId});
        }

        res.send({message: "Loginn deleted successfully!"})
    });



};
