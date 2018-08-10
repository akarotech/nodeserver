var MongoClient = require('mongodb').MongoClient;  
var appointmentObj = require('../database/appointments');
var ObjectId = require('mongodb').ObjectID;
var config = require('../config/config');

var url = config.DB_URL; 
var dbName = "AndroidApp";
var tableName = "UserTable";

  module.exports = {
saveUser :function (req, callback) {
    console.log("Save to Db called ");  
    MongoClient.connect(url, function(err, db) {  
        if (err) throw err; 
        const counter = db.collection.counter 
        var name = req.firstName +' '+ req.lastName;
        var myobj = [     
            {  _userId:counter, _name: name, _firstName: req.firstName, _lastName: req.lastName, _gender:req.gender, _userEmail:req.userEmail, _userPassword: req.userPassword}
          
        ]; 
        var dbo = db.db(dbName); 
        dbo.collection(tableName).insert(myobj, function(err, res) {  
        if (err) throw err;  
        console.log("Number of records inserted: " + res.insertedCount);  
        db.close(); 
        if (req.appointment !== null) {
            var patronId = res.ops[0]._id;
            appointmentObj.saveAppointment(patronId, req, function(err, result) {
                res["child"] = result;
                callback(err, res);
            });
        }
        else {
            callback(err, res);
        }
        });  
        });  
    },

    findEmail:function(userEmail, callback) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            dbo.collection(tableName).findOne({_userEmail:userEmail}, function(err, result) {
              if (err) throw err;
              db.close();
              callback(err, result);
            });
      });
    },

    findUser :function(userEmail, userPassword, callback) {
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db(dbName);
          var myquery = {_userEmail:userEmail, _userPassword:userPassword};

          dbo.collection(tableName).aggregate([
            {"$match": myquery},
            { $lookup:
               {
                 from: 'AppointmentTable',
                 localField: '_id',
                 foreignField: 'patron_id',
                 as: 'Appointments'
               }
             }
            ]).toArray(function(err, res) {
            if (err) throw err;
            db.close();
            callback(err, res);
          });

          /*dbo.collection(tableName).findOne({_userEmail:userEmail, _userPassword:userPassword}, function(err, result) {
            if (err) throw err;
            db.close();
            callback(err, result);
          });
        });*/
    });
    },

    updateUser :function(req, callback) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            var myquery = { _id: new ObjectId(req.id) };
            var name = req.firstName +' '+ req.lastName;
            var newvalues = { $set: {  _name: name, _firstName: req.firstName, _lastName: req.lastName, _gender:req.gender ,children:[]} };
            dbo.collection(tableName).updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
              db.close();
              
              if (req.appointment !== null) {
                var patronId = new ObjectId(req.id);
                appointmentObj.saveAppointment(patronId, req, function(err, result) {
                    res["child"] = result;
                    callback(err, res);
                });
            }
            else {
                callback(err, res);
            }

             
            });
          });
    },

    deleteUser :function(req, callback) {

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            var myquery = { _id: new ObjectId(req.id )};
            console.log(myquery);
            dbo.collection(tableName).deleteMany(myquery, function(err, obj) {
              if (err) throw err;
              db.close();
              var response = {numberOfDeletedRecords:obj.result.n}
              console.log(obj.result.n);
              callback(err, JSON.stringify(response));
            });
          });
    }
};
