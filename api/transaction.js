var q = require("q");
var _ = require('underscore');

var Loyalty = require('../db/models/loyaltySchema');
var Config = require('../db/models/configSchema');
var addPointsApi = require('./addPoints');
var applyPromotionsApi = require('./applyPromotions')
var conversionApi = require('./conversion');
var User = require('../db/models/userSchema');

module.exports = (data) => {
    var deferred = q.defer();
    var {
        configId,
        bill,
        loyaltyId
    } = data;

    Config.findById(configId, function (err, config) {
        if (err)
            deferred.reject(err);
        if (!config)
            deferred.reject("Error getting config from db");
        else {

            Loyalty.findById(loyaltyId, function (err, loyalty) {
                if (err)
                    deferred.reject(err);
                if (!loyalty)
                    deferred.reject("Error getting loyalty obj from db");
                else {

                    User.findById(loyalty.userId, function (err, user) {
                        if (err)
                            deferred.reject(err);
                        if (!user)
                            deferred.reject("Error getting user from db");
                        else {
                            var filteredPromotions = []

                            if (user.totalSpending === 0) {
                                config.promotionTypes.firstOrder.forEach(function (type) {
                                    filteredPromotions.concat(config.promotionCategory[type])
                                })
                            } else {
                                config.promotionTypes.bill.forEach(function (type) {
                                    filteredPromotions=filteredPromotions.concat(config.promotionCategory[type])
                                })
                            }
                            applyPromotionsApi({
                                promotions: filteredPromotions,
                                bill
                            }).then(function (result) {
                                loyalty.points += result.points;
                                loyalty.pointsSpent += result.spending;
                                conversionApi({
                                    config,
                                    value: result.spending,
                                    cardId: loyalty.cardId,
                                    type: 'redeem'
                                }).then(function (convertedValue) {
                                    loyalty.save(function (err, loyalty) {
                                        if (err)
                                            deferred.reject(err);
                                        if (!loyalty)
                                            deferred.reject("Error saving new loyalty to db");
                                        else {
                                            console.log(loyalty);
                                            user.totalSpending += (bill - convertedValue - result.discount)
                                            user.save(function (err, user) {
                                                if (err)
                                                    deferred.reject(err);
                                                if (!user)
                                                    deferred.reject("Error getting user from db");
                                                else {
                                                    deferred.resolve({
                                                        bill: bill - convertedValue - result.discount,
                                                        loyalty
                                                    });
                                                }
                                            })

                                        }
                                    })
                                })
                            })
                        }
                    })


                }
            })


        }
    })

    return deferred.promise;

};