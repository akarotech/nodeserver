var express = require('express');
var router = express.Router();
var userDataObj = require('../database/appointments');
var dataObj = require('../database/appointments');
var ObjectId = require('mongodb').ObjectID;

var genericsObj = require('../Generic/generic');



/* GET Appointment data. */
///Get appointment by query method
router.get('/api/appointments/findAppointment', function(req, res) {
    console.log(req.query);  

    if (!req.query.appointmentId) {
        var errorMsg = 'Query Find Appointment:Appointment id is required'; 
        res.status(400).send(genericsObj.generateValidationError(errorMsg));
        return;
   }
   dataObj.findAppointment(new ObjectId(req.query.appointmentId), function(err, result) {
       if (genericsObj.testNullUndefined(result)) {
        var errorMsg = 'Query Find Appointment: Invalid appointment id!'; 
        res.status(404).send(genericsObj.generateValidationError(errorMsg));
       }
       else {
        res.send(genericsObj.generateResults(err, result));
       }
        
    })

  });


  ///Post find appointment method
  router.post('/api/appointments/findAppointment', function(req, res) {
   if (!req.body.id) {
        var errorMsg = 'Post Find Appointment:Appointment id is required'; 
        res.status(400).send(genericsObj.generateValidationError(errorMsg));
        return;
   }
    var appointmentId = new ObjectId(req.body.id);

    dataObj.findAppointment(appointmentId, function(err, result) {
        if (genericsObj.testNullUndefined(result)) {
            var errorMsg = 'Post Find Appointment:Invalid appointment id!'; 
            res.status(400).send(genericsObj.generateValidationError(errorMsg));
           }
           else {
            res.send(genericsObj.generateResults(err, result));
           }
        
    })

    });


    ///Create Appointment with post Method
    router.post('/api/appointments/createAppointment', function(req, res) {
        if (genericsObj.testNullUndefined(req.body.patronId) || genericsObj.testNullUndefined(req.body.appointmentTitle) || genericsObj.testNullUndefined(req.body.appointmentDateTime)) {
             var errorMsg = 'Create Appointment Error:patronId, appointmentTitle and appointmentDateTime are  required'; 
            res.status(400).send(genericsObj.generateValidationError(errorMsg));
             return;
        }

        var patronId = !genericsObj.testNullUndefined(req.body.patronId) ? req.body.patronId : ""
        var dbRequest = {
            "appointment":{
            "appointmentTitle" : !genericsObj.testNullUndefined(req.body.appointmentTitle) ? req.body.appointmentTitle : "",
            "appointmentDateTime" : !genericsObj.testNullUndefined(req.body.appointmentDateTime) ? req.body.appointmentDateTime : "",
            "appointmentDescription" : !genericsObj.testNullUndefined(req.body.appointmentDescription) ? req.body.appointmentDescription : "",
            "appointmentDuraion" : !genericsObj.testNullUndefined(req.body.appointmentDuraion) ? req.body.appointmentDuraion : "",
            }
        }
    
        dataObj.saveAppointment(new ObjectId(patronId), dbRequest, function(err, result) {
            res.send(genericsObj.generateResults(err, result));
        })
     });



     ///Update user with post request

     router.post('/api/appointments/updateAppointment', function(req, res) {
        if (genericsObj.testNullUndefined(req.body.id) || genericsObj.testNullUndefined(req.body.appointmentTitle) || genericsObj.testNullUndefined(req.body.appointmentDateTime)) {
            var errorMsg = 'Signup Error:id, appointmentTitle and appointmentDateTime are  required'; 
           res.status(400).send(genericsObj.generateValidationError(errorMsg));
            return;
       }

        var dbRequest = {
            "appointmentId": new ObjectId(req.body.id),
            "appointmentTitle" : !genericsObj.testNullUndefined(req.body.appointmentTitle) ? req.body.appointmentTitle : "",
            "appointmentDateTime" : !genericsObj.testNullUndefined(req.body.appointmentDateTime) ? req.body.appointmentDateTime : "",
            "appointmentDescription" : !genericsObj.testNullUndefined(req.body.appointmentDescription) ? req.body.appointmentDescription : "",
            "appointmentDuraion" : !genericsObj.testNullUndefined(req.body.appointmentDuraion) ? req.body.appointmentDuraion : "",

        }
   
        dataObj.updateAppointment(dbRequest, function(err, result) {
            res.send(genericsObj.generateResults(err, result));
       })
     });

     ///Delete user with post request

     router.post('/api/appointments/deleteAppointment', function(req, res) {
        if (genericsObj.testNullUndefined(req.body.id) || genericsObj.testNullUndefined(req.body.id)) {
            var errorMsg = 'Delete Error:Appointment Id is  required'; 
            res.status(400).send(genericsObj.generateValidationError(errorMsg));
            
            return;
       }

       var dbRequest = {
           "id" : !genericsObj.testNullUndefined(req.body.id) ? new ObjectId(req.body.id) : "",
       }
   
        dataObj.deleteAppointment(dbRequest, function(err, result) {
            res.send(genericsObj.generateResults(err, result));
       })
     });

module.exports = router;
