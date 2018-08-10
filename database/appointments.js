var MongoClient = require('mongodb').MongoClient;  
var ObjectId = require('mongodb').ObjectID;
var config = require('../config/config');

var url = config.DB_URL; 
var dbName = "AndroidApp";
var tableName = "AppointmentTable";

module.exports = {
saveAppointment :function (patronId, req, callback) {
    console.log("Save to Db called " + patronId);  
    MongoClient.connect(url, function(err, db) {  
        if (err) throw err; 
        const counter = db.collection.counter 
        var myobj = [     
            { patron_id:patronId, _appointmentTitle: req.appointment.appointmentTitle, _appointmentDateTime: req.appointment.appointmentDateTime, _appointmentDescription: req.appointment.appointmentDescription, _appointmentDuraion:req.appointment.appointmentDuraion }
          
        ]; 
        var dbo = db.db(dbName); 
        dbo.collection(tableName).insert(myobj, function(err, res) {  
        if (err) throw err;  
        console.log("Number of appointments inserted: " + res.insertedCount);  
        db.close(); 
        callback(err, res);
        });  
        });  
    },

    findAppointment :function(appointmentId, callback) {
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db(dbName);
          dbo.collection(tableName).findOne({_id:appointmentId}, function(err, result) {
            if (err) throw err;
            db.close();
            callback(err, result);
          });
        });
    },

    updateAppointment :function(req, callback) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            var myquery = { _id: req.appointmentId };
            var newvalues = { $set: {  _appointmentTitle: req.appointmentTitle, _appointmentDateTime: req.appointmentDateTime, _appointmentDescription: req.appointmentDescription, _appointmentDuraion:req.appointmentDuraion } };
            dbo.collection(tableName).updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
              db.close();
              callback(err, res);
            });
          });
    },

    deleteAppointment :function(req, callback) {

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            var myquery = { _id: new ObjectId(req.id )};
            dbo.collection(tableName).deleteOne(myquery, function(err, obj) {
              if (err) throw err;
              console.log("1 document deleted");
              db.close();
              callback(err, obj);
            });
          });
    }
};
