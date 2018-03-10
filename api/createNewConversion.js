var _ = require('underscore');
var q = require('q');
var Config = require('../db/models/configSchema');

module.exports = (data) => {

    var deferred = q.defer();
    var {
        type,
        configId,
        value,
        cardId
    } = data;


    Config.findById(configId, function (err, config) {
        if (err)
            deferred.reject(err);
        if (!config)
            deferred.reject("Error finding config.");
        else {
            config.conversionRate[type].push({
                value,
                cardId
                        })
            config.markModified('conversionRate');
            config.save(function (err, doc) {
                if (err)
                    deferred.reject(err);
                if (!config)
                    deferred.reject("Error saving promotion to config.");
                else
                    deferred.resolve(doc);
            })

        }
    })

    return deferred.promise;

}