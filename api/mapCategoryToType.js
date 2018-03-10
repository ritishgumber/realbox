var q = require("q");
var _ = require('underscore');

var Config = require('../db/models/configSchema');

module.exports = (data) => {
    var deferred = q.defer();

    var {
        types,
        category,
        configId
    } = data;

    types = types.split(",").map(String)

    Config.findById(configId, function (err, config) {
        if (err)
            deferred.reject(err);
        if (!config)
            deferred.reject("Error getting config from db");
        else {
            types.forEach(function (type) {
                config.promotionTypes[type].push(category);
            })
            config.markModified('promotionTypes');
            config.save(function (err, config) {
                if (err)
                    deferred.reject(err);
                if (!config)
                    deferred.reject("Error getting config from db");
                else
                    deferred.resolve(config);
            })
        }
    })




    return deferred.promise;

};