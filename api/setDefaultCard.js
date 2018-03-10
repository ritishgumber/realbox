var q = require("q");

var Config = require('../db/models/configSchema');
module.exports = (data) => {
    var deferred = q.defer();
      Config.findById(data.configId, function (err, config) {
                if (err)
                    deferred.reject(err);
                if (!config)
                    deferred.reject("Error finding config.");
                else {
                    console.log(config);
                    config.defaultCard=data.cardId;
                    config.save(function (err, doc) {
                        if (err)
                            deferred.reject(err);
                        if (!config)
                            deferred.reject("Error setting default card in config.");
                        else
                            deferred.resolve(doc.defaultCard);
                    })
                }
            })
    return deferred.promise;

};