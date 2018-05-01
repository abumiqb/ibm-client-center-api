var Booking = require('../models/booking.model.js');
var nodemailer = require('nodemailer');

function mailBookingCreate(til, navn, firma, phone, antall, dato, starttid, slutttid, room )
{

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 's236372mail@gmail.com',
        pass: 'IQbal9191'
    }
});

var mailOptions = {
    from: 's236372mail@gmail.com',
    to:  til,
    subject: 'IBM Client Center Booking ',
    text:  'You will get a confirmation mail when the booking is confirmed' + '\n\n'  +  'Name: ' + navn + '\n' + 'Firm: ' + firma + '\n' + 'Email: '
    + til  + '\n' + 'Phone: ' + phone  + '\n' + 'Number of people: ' +
    antall  + '\n' + 'Date: ' + dato  + '\n' + 'Start time: ' + starttid + '\n' +
    'End time: ' + slutttid + '\n' + 'Room: ' + room
};

transporter.sendMail(mailOptions, function(error, info)
{
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
}

function mailBookingConfirm(til, navn, firma, phone, antall, dato, starttid, slutttid, room )
{

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 's236372mail@gmail.com',
            pass: 'IQbal9191'
        }
    });

    var mailOptions = {
        from: 's236372mail@gmail.com',
        to:  til,
        subject: 'IBM Client Center Booking ',
        text:  'Your booking has been confirmed' + '\n\n'  +  'Name: ' + navn + '\n' + 'Firm: ' + firma + '\n' + 'Email: '
        + til  + '\n' + 'Phone: ' + phone  + '\n' + 'Number of people: ' +
        antall  + '\n' + 'Date: ' + dato  + '\n' + 'Start time: ' + starttid + '\n' +
        'End time: ' + slutttid + '\n' + 'Room: ' + room
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

exports.create = function(req, res) 
{
    // Create and Save a new booking

    if(!req.body.navn) {
        return res.status(400).send({melding: "Booking can not be empty"});
    }

    var booking = new Booking({
                               navn: req.body.navn,
                               firma: req.body.firma,
                               email: req.body.email,
                               phone: req.body.phone,
                               antall: req.body.antall,
                               dato: req.body.dato,
                               starttid: req.body.starttid,
                               slutttid: req.body.slutttid,
                               opportunityNr: req.body.opportunityNr,
                               room: req.body.room,
                               approved: req.body.approved,
    });

    booking.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({melding: "Error ny booking"});
        } else {
            mailBookingCreate(booking.email, booking.navn,  booking.firma, booking.phone, booking.antall, booking.dato, booking.starttid, booking.slutttid, booking.room);
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
        booking.email = req.body.email;
        booking.phone = req.body.phone;
        booking.antall = req.body.antall;
        booking.dato = req.body.dato;
        booking.starttid = req.body.starttid;
        booking.slutttid = req.body.slutttid;
        booking.opportunityNr = req.body.opportunityNr;
        booking.room = req.body.room;
        booking.approved = req.body.approved;


        booking.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update booking with id " + req.params.bookingId});
            } else {
                if(booking.approved == true)
                {
                    mailBookingConfirm(booking.email, booking.navn, booking.firma, booking.phone, booking.antall, booking.dato, booking.starttid, booking.slutttid, booking.room);
                }
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
