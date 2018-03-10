var q = require("q");

var User = require('../db/models/userSchema');
var Card = require('../db/models/cardSchema');
var Loyalty = require('../db/models/loyaltySchema');
var Config = require('../db/models/configSchema');
var createNewLoyaltyApi = require('./createNewLoyalty');

module.exports = (data) => {
    var deferred = q.defer();
    var user = new User({
        phone: data.phone
    })
    user.save(function (err, user) {
        if (err)
            deferred.reject(err);
        if (!user)
            deferred.reject("Error saving new user to db");
        else {
            console.log(user);
            Config.findById(data.configId, function (err, config) {
                if (err)
                    deferred.reject(err);
                if (!config)
                    deferred.reject("Error getting config from db");
                else {
                    if (config.defaultCard) {
                        createNewLoyaltyApi({
                            cardId: config.defaultCard.toString(),
                            userId: user._id,configId:data.configId
                        }).then(function (result) {
                            deferred.resolve(result);
                        }, function (err) {
                            deferred.reject(err)
                        })
                    }
                    else{
                            deferred.resolve(user);
                    }
                }
            })
        }
    })
    return deferred.promise;
};