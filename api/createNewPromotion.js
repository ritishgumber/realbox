var Promotion = require('../db/models/promotionSchema');
var Config = require('../db/models/configSchema');
var api = require('../api/index');
var _ = require('underscore')


var q = require("q");

module.exports = (data) => {
    var deferred = q.defer();
    var {
        startDate,
        endDate,
        itemIds,
        minValue,
        maxValue,
        redeemPartially,
        cashDiscount,
        cardIds,
        notApplicableWith,
        transaction,
        spending,
        discount,
        categories
    } = data;

    if (transaction)
        transaction = JSON.parse(transaction)
    else transaction = {}

    if (spending)
        spending = JSON.parse(spending)
    else
        spending = {}

    if (discount)
        discount = JSON.parse(discount)
    else
        discount = {}
    if (discount.value)
        api.conversion()


    cardIds = cardIds.split(",").map(String)
    categories = categories.split(",").map(String)

    var promotion = new Promotion({
        startDate,
        endDate,
        transaction,
        spending,
        discount,
        itemIds,
        minValue,
        maxValue,
        redeemPartially,
        cashDiscount,
        notApplicableWith,
        cardIds
    })
    promotion.save(function (err, promotion) {
        if (err)
            deferred.reject(err);
        if (!promotion)
            deferred.reject("Error saving new promotion to db");
        else {
            console.log(promotion);
            Config.findById(data.configId, function (err, config) {
                if (err)
                    deferred.reject(err);
                if (!config)
                    deferred.reject("Error finding config.");
                else {
                    console.log(config);
                    categories.forEach(function (category) {
                        if (!config.promotionCategory[category])
                            config.promotionCategory[category] = [];
                        config.promotionCategory[category].push((promotion._id).toString());
                    })

                    config.markModified('promotionCategory');
                    config.save(function (err, doc) {
                        if (err)
                            deferred.reject(err);
                        if (!config)
                            deferred.reject("Error saving promotion to config.");
                        else
                            deferred.resolve(promotion);
                    })
                }
            })
        }
    })
    return deferred.promise;

};