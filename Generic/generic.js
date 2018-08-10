module.exports = {

    testNullUndefined :function (param) {
        if (param !== null  && param !== undefined) {
            return false;
        }
        return true;
    },

    generateResults :function(err, response) {
        var results = {"error" : null, "response":null};
        if (!this.testNullUndefined(err)) {
            results["error"] = err;
            results["status"] = 400;
            results["success"] = false;
        }
       else {
            results["response"] = response;
            results["status"] = 200;
            results["success"] = true;
       }

       return results;
    },

    generateValidationError :function(err) {
        var results = {"error" : null};
        if (!this.testNullUndefined(err)) {
            results["error"] = err;
            results["status"] = 400;
        }

       return results;
    },
    generateEmailAlreadyRegisteredError :function(err) {
        var results = {"error" : null};
        if (!this.testNullUndefined(err)) {
            results["error"] = err;
            results["status"] = 409;
        }

       return results;
    }

};
    