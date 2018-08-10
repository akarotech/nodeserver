var express = require('express');
var userDataObj = require('../database/userData');

//userDataObj.saveUser("test@test.com", "India500");
//userDataObj.findUser("rakesh.kum30@gmail.com");

// userDataObj.findUser("rakesh.kum30@gmail.com","India@2018", function(err, result) {
//     console.log(result);
// })

var dbRequest = {
    "userEmail" : "rakesh.kum30@gmail.com",
    "userPassword" :"India@2018",
    "firstName" : "Rakesh",
    "lastName" : "Rajput",
    "gender" : "M"
}

//  userDataObj.updateUser(dbRequest, function(err, result) {
//     console.log(result);
// })

userDataObj.findEmail("rakesh.kum30@gmail.com", function(err, result) {
    console.log(result);
})
