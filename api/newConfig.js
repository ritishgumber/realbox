var q = require("q");

var Config = require('../db/models/configSchema');
module.exports = (data) => {
    var {name}=data;
    var deferred = q.defer();
    var config = new Config({
        name,
        promotionCategory:{}
    })
    
    config.save(function (err, config) {
        if (err)
            deferred.reject(err);
        if (!config)
            deferred.reject("Error saving new config to db");
        else {
            console.log(config);
            deferred.resolve(config);
        }
    })
    return deferred.promise;
};