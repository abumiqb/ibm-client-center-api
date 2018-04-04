var Booking = require('../models/booking.model.js');

exports.create = function(req, res) 
{
    // Create and Save a new booking

    if(!req.body.navn) {
        return res.status(400).send({melding: "Booking can not be empty"});
    }

    var booking = new Booking({navn: req.body.navn,
                               firma: req.body.firma,
                               antall: req.body.antall,
                               dato: req.body.dato,
                               starttid: req.body.starttid,
                               slutttid: req.body.slutttid,
                               scnr: req.body.scnr,
                               lunsj: req.body.lunsj,
                               omvisning: req.body.omvisning});

    booking.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({melding: "Error ny booking"});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) 
{
    // Retrieve and return all bookings from the database.

      Booking.find(function(err, booking){
        if(err) {
            console.log(err);
            res.status(500).send({melding: "Error fetch booking"});
        } else {
            res.send(booking);
        }
    });

};

exports.findOne = function(req, res) 
{
    // Find a single booking with a bookingId

       Booking.findById(req.params.bookingId, function(err, booking) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({melding: "Booking ikke funnet med id " + req.params.bookingId});
            }
            return res.status(500).send({melding: "Error retrieving booking with id " + req.params.bookingId});
        } 

        if(!booking) {
            return res.status(404).send({melding: "Booking ikke funnet med id " + req.params.bookingId});
        }

        res.send(booking);
    });

};

exports.update = function(req, res) 
{
    // Update a booking identified by the bookingId in the request

     Booking.findById(req.params.bookingId, function(err, booking) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Booking ikke finnet med id " + req.params.bookingId});
            }
            return res.status(500).send({message: "Error finding booking with id " + req.params.bookingId});
        }

        if(!booking) {
            return res.status(404).send({message: "Booking not found with id " + req.params.bookingId});            
        }

        booking.navn = req.body.navn;
        booking.firma = req.body.firma;
        booking.antall = req.body.antall;
        booking.dato = req.body.dato;
        booking.starttid = req.body.starttid;
        booking.slutttid = req.body.slutttid;
        booking.scnr = req.body.scnr;
        booking.lunsj = req.body.lunsj;
        booking.omvisning = req.body.omvisning;


        booking.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update booking with id " + req.params.bookingId});
            } else {
                res.send(data);
            }
        });
    });

};

exports.delete = function(req, res) 
{
    // Delete a booking with the specified bookingId in the request

    Booking.findByIdAndRemove(req.params.bookingId, function(err, booking) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Booking not found with id " + req.params.bookingId});                
            }
            return res.status(500).send({message: "Could not delete booking with id " + req.params.bookingId});
        }

        if(!booking) {
            return res.status(404).send({message: "Booking not found with id " + req.params.bookingId});
        }

        res.send({message: "Booking deleted successfully!"})
    });



};
