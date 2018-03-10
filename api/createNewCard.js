var q = require("q");

var Card = require('../db/models/cardSchema');
var Config = require('../db/models/configSchema');
module.exports = (data) => {
    var deferred = q.defer();
    var {
        label,
        validity,
        isActive
    } = data;
    var card = new Card({
        label,
        validity,
        isActive
    })
    card.save(function (err, card) {
        if (err)
            deferred.reject(err);
        if (!card)
            deferred.reject("Error saving new card to db");
        else {
            console.log(card);
            Config.findById(data.configId, function (err, config) {
                if (err)
                    deferred.reject(err);
                if (!config)
                    deferred.reject("Error finding config.");
                else {
                    console.log(config);
                    config.cards.push(card);
                    config.markModified('cards');
                    config.save(function (err, doc) {
                        if (err)
                            deferred.reject(err);
                        if (!config)
                            deferred.reject("Error saving card to config.");
                        else
                            deferred.resolve(card);
                    })
                }
            })
        }
    })
    return deferred.promise;

};