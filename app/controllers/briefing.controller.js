var Briefing = require('../models/briefing.model.js');
var nodemailer = require('nodemailer');

function mailBriefingCreate(til, navn, firma, phone, antall, dato, starttid, slutttid, room )
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
    subject: 'IBM Client Center',
    text:  'You will get a confirmation mail when the briefing is confirmed' + '\n\n'  +  'Name: ' + navn + '\n' + 'Firm: ' + firma + '\n' + 'Email: '
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

function mailBriefingConfirm(til, navn, firma, phone, antall, dato, starttid, slutttid, room )
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
        subject: 'IBM Client Center ',
        text:  'Your briefing has been confirmed' + '\n\n'  +  'Name: ' + navn + '\n' + 'Firm: ' + firma + '\n' + 'Email: '
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
    // Create and Save a new briefing

    if(!req.body.navn) {
        return res.status(400).send({melding: "Briefing can not be empty"});
    }

    var briefing = new Briefing({
                               navn: req.body.navn,
                               firma: req.body.firma,
                               email: req.body.email,
                               phone: req.body.phone,
                               antall: req.body.antall,
                               dato: req.body.dato,
                               starttid: req.body.starttid,
                               briefing: req.body.briefing,
                               approved: req.body.approved,
    });

    briefing.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({melding: "Error ny briefing"});
        } else {
            mailBriefingCreate(briefing.email, briefing.navn,  briefing.firma, briefing.phone, briefing.antall, briefing.dato, briefing.starttid, briefing.slutttid, briefing.room);
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) 
{
    // Retrieve and return all briefings from the database.

      Briefing.find(function(err, briefing){
        if(err) {
            console.log(err);
            res.status(500).send({melding: "Error fetch briefing"});
        } else {
            res.send(briefing);
        }
    });

};

exports.findOne = function(req, res) 
{
    // Find a single briefing with a briefingId

       Briefing.findById(req.params.briefingId, function(err, briefing) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({melding: "Briefing ikke funnet med id " + req.params.briefingId});
            }
            return res.status(500).send({melding: "Error retrieving briefing with id " + req.params.briefingId});
        } 

        if(!briefing) {
            return res.status(404).send({melding: "Briefing ikke funnet med id " + req.params.briefingId});
        }

        res.send(briefing);
    });

};

exports.update = function(req, res) 
{
    // Update a briefing identified by the briefingId in the request

     Briefing.findById(req.params.briefingId, function(err, briefing) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Briefing ikke finnet med id " + req.params.briefingId});
            }
            return res.status(500).send({message: "Error finding briefing with id " + req.params.briefingId});
        }

        if(!briefing) {
            return res.status(404).send({message: "Briefing not found with id " + req.params.briefingId});            
        }

        briefing.navn = req.body.navn;
        briefing.firma = req.body.firma;
        briefing.email = req.body.email;
        briefing.phone = req.body.phone;
        briefing.antall = req.body.antall;
        briefing.dato = req.body.dato;
        briefing.starttid = req.body.starttid;
        briefing.briefing = req.body.briefing
        briefing.approved = req.body.approved;


        briefing.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update briefing with id " + req.params.briefingId});
            } else {
                if(briefing.approved == true)
                {
                    mailBriefingConfirm(briefing.email, briefing.navn, briefing.firma, briefing.phone, briefing.antall, briefing.dato, briefing.starttid, briefing.slutttid, briefing.room);
                }
                res.send(data);
            }
        });
    });

};

exports.delete = function(req, res) 
{
    // Delete a briefing with the specified briefingId in the request

    Briefing.findByIdAndRemove(req.params.briefingId, function(err, briefing) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Briefing not found with id " + req.params.briefingId});                
            }
            return res.status(500).send({message: "Could not delete briefing with id " + req.params.briefingId});
        }

        if(!briefing) {
            return res.status(404).send({message: "Briefing not found with id " + req.params.briefingId});
        }

        res.send({message: "Briefing deleted successfully!"})
    });
};
