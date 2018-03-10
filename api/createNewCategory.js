var q = require("q");

var Config = require('../db/models/configSchema');

module.exports = (data) => {
    var deferred = q.defer();

    var {
        name,
        configId
    } = data;
    Config.findById(configId, function (err, config) {
        if (err)
            deferred.reject(err);
        if (!config)
            deferred.reject("Error getting config from db");
        else {
            if(!config.promotionCategory)
            config.promotionCategory={}
            config.promotionCategory[name]=[];
            config.markModified('promotionCategory');
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