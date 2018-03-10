var q = require("q");
var _ = require('underscore');
var applyPromotionsApi = require('./applyPromotions')
var conversionApi = require('./conversion');

var Loyalty = require('../db/models/loyaltySchema');
var Config = require('../db/models/configSchema');

module.exports = (data) => {
    var deferred = q.defer();

    var {
        loyaltyId,
        value,
        configId
    } = data;

    Loyalty.findById(loyaltyId, function (err, loyalty) {
        if (err)
            deferred.reject(err);
        if (!loyalty)
            deferred.reject("Error getting loyalty obj from db");
        else {
            Config.findById(configId, function (err, config) {
                if (err)
                    deferred.reject(err);
                if (!config)
                    deferred.reject("Error getting config from db");
                else {
                    var filteredPromotions = [];

                    config.promotionTypes.recharge.forEach(function(type){
                        filteredPromotions=filteredPromotions.concat( config.promotionCategory[type])
                    })

                    applyPromotionsApi({
                        promotions:filteredPromotions,
                        bill: 0
                    }).then(function (result) {
                        conversionApi({config,value,cardId:loyalty.cardId,type:'recharge'}).then(function (points) {
                            loyalty.points = loyalty.points + points+result.points;
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

                    })
                }
            })
        }
    })



    return deferred.promise;

};