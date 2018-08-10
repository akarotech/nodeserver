/* OPENSHIFT ENVIRONMENT VARIABLES */

var env = process.env;

var config = {};

// HOST VARIABLES
config.HOST_IP = process.env.IP || 'localhost';
config.HOST_PORT = process.env.PORT || 8080;

// MONGODB VARIABLES
config.DB_HOST = 'localhost';
config.DB_PORT = 27017;
config.DB_URL = 'mongodb://localhost:27017/';

module.exports = config;
