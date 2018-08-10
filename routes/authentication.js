var express = require('express');
var router = express.Router();
var userDataObj = require('../database/userData');
var genericsObj = require('../Generic/generic');
var dateFormat = require('dateformat');



// route middleware to validate :name
/*router.param('userName:password', function(req, res, next, userName, password) {
    // do validation on name here
    // blah blah validation
    // log something so we know its working
    console.log('doing name validations on ' + userName);

    // once validation is done save the new item in the req
    req.userName = userName;
    req.password = password;

    // go to the next thing
    next(); 
});*/

/* GET user data. */
///Get user login by query method
router.get('/api/auth/login', function(req, res) {
    if (!req.query.userName || !req.query.userPassword) {
        var errorMsg = 'Query Login:Email and password are  required'; 
        res.status(400).send(genericsObj.generateValidationError(errorMsg));
        return;
   }
    userDataObj.findUser(req.query.userName, req.query.userPassword, function(err, result) {
       if (genericsObj.testNullUndefined(result)) {
        var errorMsg = 'Query Login: Invalid email or password!'; 
        res.status(404).send(genericsObj.generateValidationError(errorMsg));
       }
       else {
        res.send(genericsObj.generateResults(err, result));
       }
        
    })

  });

  ///Get user login by param method
  router.get('/api/auth/login/userName=:userName&userPassword=:userPassword', function(req, res) {
    if (!req.params.userName || !req.params.userPassword) {
        var errorMsg = 'Param Login:Email and password are  required'; 
        res.status(400).send(genericsObj.generateValidationError(errorMsg));
        return;
   }
    userDataObj.findUser(req.params.userName, req.params.userPassword, function(err, result) {
        if (genericsObj.testNullUndefined(result)) {
            var errorMsg = 'Param Login:Invalid email or password!'; 
            res.status(400).send(genericsObj.generateValidationError(errorMsg));
           }
           else {
            res.send(genericsObj.generateResults(err, result));
           }
    })
  });

  ///Post user login method
  router.post('/api/auth/login', function(req, res) {
   if (!req.body.userName || !req.body.userPassword) {
        var errorMsg = 'Post Login:Email and password are  required'; 
        res.status(400).send(genericsObj.generateValidationError(errorMsg));
        return;
   }
    var userEmail = req.body.userName;
    var userPassword = req.body.userPassword;

    userDataObj.findUser(userEmail, userPassword, function(err, result) {
        if (genericsObj.testNullUndefined(result)) {
            var errorMsg = 'Post Login: Invalid email or password!'; 
            res.status(400).send(genericsObj.generateValidationError(errorMsg));
           }
           else {
            res.send(genericsObj.generateResults(err, result));
           }
        
    })

    });

    ///Signup User with post Method
    router.post('/api/auth/signUp', function(req, res) {
        if (genericsObj.testNullUndefined(req.body.userName) || genericsObj.testNullUndefined(req.body.userPassword)) {
             var errorMsg = 'Signup Error:Email and password are  required'; 
            res.status(400).send(genericsObj.generateValidationError(errorMsg));
             return;
        }

        userDataObj.findEmail(req.body.userName, function(err, result) {
            if (genericsObj.testNullUndefined(err)) {
                if (!genericsObj.testNullUndefined(result)) {
                
                    if (!genericsObj.testNullUndefined(result["_id"])) {
                        var errorMsg = 'Signup Error:Email already registered!'; 
                        res.status(409).send(genericsObj.generateEmailAlreadyRegisteredError(errorMsg));
                        return;
                    }
                    else {
                        var now = new Date();
                        var dbRequest = {
                            "userEmail" : !genericsObj.testNullUndefined(req.body.userName) ? req.body.userName : "",
                            "userPassword" : !genericsObj.testNullUndefined(req.body.userPassword) ? req.body.userPassword : "",
                            "firstName" : !genericsObj.testNullUndefined(req.body.firstName) ? req.body.firstName : "",
                            "lastName" : !genericsObj.testNullUndefined(req.body.lastName) ? req.body.lastName : "",
                            "gender" : !genericsObj.testNullUndefined(req.body.gender) ? req.body.gender : "",
                
                            "appointment": {
                                "appointmentTitle":"defaultTitle",
                                "appointmentDateTime":dateFormat(now, "dd/mm/yyyy HH:mm:ss"),
                                "appointmentDescription":"defaultDescription",
                                "appointmentDuraion":"0"
                            }
                
                        }
                    
                         userDataObj.saveUser(dbRequest, function(err, result) {
                            res.status(201).send(genericsObj.generateResults(err, result));
                        })
                    }
                }
                else {
                    var now = new Date();
                    var dbRequest = {
                        "userEmail" : !genericsObj.testNullUndefined(req.body.userName) ? req.body.userName : "",
                        "userPassword" : !genericsObj.testNullUndefined(req.body.userPassword) ? req.body.userPassword : "",
                        "firstName" : !genericsObj.testNullUndefined(req.body.firstName) ? req.body.firstName : "",
                        "lastName" : !genericsObj.testNullUndefined(req.body.lastName) ? req.body.lastName : "",
                        "gender" : !genericsObj.testNullUndefined(req.body.gender) ? req.body.gender : "",
            
                        "appointment": {
                            "appointmentTitle":"defaultTitle",
                            "appointmentDateTime":dateFormat(now, "dd/mm/yyyy HH:mm:ss"),
                            "appointmentDescription":"defaultDescription",
                            "appointmentDuraion":"0"
                        }
            
                    }
                
                     userDataObj.saveUser(dbRequest, function(err, result) {
                        res.status(201).send(genericsObj.generateResults(err, result));
                    })
                }
            }
        })
     });



     ///Update user with post request

     router.post('/api/auth/updateUser', function(req, res) {
        if (genericsObj.testNullUndefined(req.body.userName) || genericsObj.testNullUndefined(req.body.userPassword)) {
            var errorMsg = 'Update Error:Email and password are  required'; 
            res.status(400).send(genericsObj.generateValidationError(errorMsg));
            return;
       }

       var appointment = null;
      
       if (!genericsObj.testNullUndefined(req.body.appointment)) {
        appointment = {
            "appointmentTitle" : !genericsObj.testNullUndefined(req.body.appointment.appointmentTitle) ? req.body.appointment.appointmentTitle : "",
            "appointmentDateTime" : !genericsObj.testNullUndefined(req.body.appointment.appointmentDateTime) ? req.body.appointment.appointmentDateTime : "",
            "appointmentDescription" : !genericsObj.testNullUndefined(req.body.appointment.appointmentDescription) ? req.body.appointment.appointmentDescription : "",
            "appointmentDuraion" : !genericsObj.testNullUndefined(req.body.appointment.appointmentDuraion) ? req.body.appointment.appointmentDuraion : ""
        }
       }
       

       var dbRequest = {
            "id" : !genericsObj.testNullUndefined(req.body.id) ? req.body.id : "",
           "userEmail" : !genericsObj.testNullUndefined(req.body.userName) ? req.body.userName : "",
           "userPassword" : !genericsObj.testNullUndefined(req.body.userPassword) ? req.body.userPassword : "",
           "firstName" : !genericsObj.testNullUndefined(req.body.firstName) ? req.body.firstName : "",
           "lastName" : !genericsObj.testNullUndefined(req.body.lastName) ? req.body.lastName : "",
           "gender" : !genericsObj.testNullUndefined(req.body.gender) ? req.body.gender : "",
           "appointment": appointment
        }
   
        userDataObj.updateUser(dbRequest, function(err, result) {
            res.send(genericsObj.generateResults(err, result));
       })
     });

     ///Delete user with post request

     router.post('/api/auth/deleteUser', function(req, res) {
        if (genericsObj.testNullUndefined(req.body.id) || genericsObj.testNullUndefined(req.body.id)) {
            var errorMsg = 'Delete Error:Id is  required'; 
            res.status(400).send(genericsObj.generateValidationError(errorMsg));
            
            return;
       }

       var dbRequest = {
           "id" : !genericsObj.testNullUndefined(req.body.id) ? req.body.id : "",
       }
   
        userDataObj.deleteUser(dbRequest, function(err, result) {
            res.send(genericsObj.generateResults(err, result));
       })
     });

    /* router.put('/api/auth/updateUser', function(req, res) {
        if (genericsObj.testNullUndefined(req.body.userName) || genericsObj.testNullUndefined(req.body.userPassword)) {
            res.status(400).send('Update Error:Email and password are  required');
            return;
       }

       var dbRequest = {
           "userEmail" : !genericsObj.testNullUndefined(req.body.userName) ? req.body.userName : "",
           "userPassword" : !genericsObj.testNullUndefined(req.body.userPassword) ? req.body.userPassword : "",
           "firstName" : !genericsObj.testNullUndefined(req.body.firstName) ? req.body.firstName : "",
           "lastName" : !genericsObj.testNullUndefined(req.body.lastName) ? req.body.lastName : "",
           "gender" : !genericsObj.testNullUndefined(req.body.gender) ? req.body.gender : ""

       }
   
        userDataObj.updateUser(dbRequest, function(err, result) {
           res.send(result);
       })
     });*/

module.exports = router;
