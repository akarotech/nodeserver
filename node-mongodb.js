var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;

var url = 'mongodb://localhost:27017/myExtressApp';

mongoClient.connect(url, function(err, db) {
      createDocuments(db, function() {
	    db.close();
	  });
});

var createDocuments = function(db, callback) {
     var collection = db.collection("jduser");
     collection.insert([
	{firstname : "Rakesh",lastname: "Kumar",emailid: "rakesh.kum30@gmail.com"}, 
	{firstname : "Mani",lastname: "Nulu",emailid: "mani@gmail.com"},  
	{firstname : "Bharat",lastname: "Nulu",emailid: "bharat@gmail.com"}, 
	], function(err, result) {
	callback(result);
      });
}
