var openshift = require('./config-openshift');
var development = require('./config-dev');

var env = process.env;

function getConfig() {
    // if(env.NODE_ENV && env.NODE_ENV === 'production') {
        return openshift;
    // } else {
         //return development;
    // }
}

module.exports = getConfig();
 