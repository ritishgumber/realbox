var q = require("q");

var Loyalty = require('../db/models/loyaltySchema');
var Config = require('../db/models/configSchema');
var Promotion = require('../db/models/promotionSchema')
var _ = require('underscore');

var applyPromotionsApi = require('./applyPromotions')

module.exports = (data) => {
    var deferred = q.defer();
    var {
        cardId,
        userId
    } = data;
    Config.findById(data.configId, function (err, config) {
        if (err)
            deferred.reject(err);
        if (!config)
            deferred.reject("Error getting config from db");
        else {
            var filteredPromotions = []
             config.promotionTypes.signup.forEach(function(type){
                        filteredPromotions=filteredPromotions.concat( config.promotionCategory[type])
                    })

            applyPromotionsApi({promotions:filteredPromotions,bill:0}).then(function (result) {
                var loyalty = new Loyalty({
                    cardId,
                    userId,
                    points: result.points
                })
                loyalty.save(function (err, loyalty) {
                    if (err)
                        deferred.reject(err);
                    if (!loyalty)
                        deferred.reject("Error saving new loyalty to db");
                    else {
                        console.log(loyalty);
                        deferred.resolve(loyalty);
                    }
                })
            })
        }
    })


    return deferred.promise;

};