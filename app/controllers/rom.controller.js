var Rom = require('../models/rom.model.js');

exports.create = function(req, res) 
{
    // Create and Save a new rom

    if(!req.body.navn) {
        return res.status(400).send({melding: "Rom can not be empty"});
    }

    var rom = new Rom({navn: req.body.navn
    });

    rom.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({melding: "Error ny rom"});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) 
{
    // Retrieve and return all roms from the database.

      Rom.find(function(err, rom){
        if(err) {
            console.log(err);
            res.status(500).send({melding: "Error fetch rom"});
        } else {
            res.send(rom);
        }
    });

};

exports.findOne = function(req, res) 
{
    // Find a single rom with a romId

       Rom.findById(req.params.romId, function(err, rom) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({melding: "Rom ikke funnet med id " + req.params.romId});
            }
            return res.status(500).send({melding: "Error retrieving rom with id " + req.params.romId});
        } 

        if(!rom) {
            return res.status(404).send({melding: "Rom ikke funnet med id " + req.params.romId});
        }

        res.send(rom);
    });

};

exports.update = function(req, res) 
{
    // Update a rom identified by the romId in the request

     Rom.findById(req.params.romId, function(err, rom) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Rom ikke finnet med id " + req.params.romId});
            }
            return res.status(500).send({message: "Error finding rom with id " + req.params.romId});
        }

        if(!rom) {
            return res.status(404).send({message: "Rom not found with id " + req.params.romId});            
        }

        rom.navn = req.body.navn;



        rom.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update rom with id " + req.params.romId});
            } else {
                res.send(data);
            }
        });
    });

};

exports.delete = function(req, res) 
{
    // Delete a rom with the specified romId in the request

    Rom.findByIdAndRemove(req.params.romId, function(err, rom) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Rom not found with id " + req.params.romId});                
            }
            return res.status(500).send({message: "Could not delete rom with id " + req.params.romId});
        }

        if(!rom) {
            return res.status(404).send({message: "Rom not found with id " + req.params.romId});
        }

        res.send({message: "Rom deleted successfully!"})
    });



};
