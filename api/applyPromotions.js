var q = require("q");
var Promotion = require('../db/models/promotionSchema');

module.exports = (data) => {
    var deferred = q.defer();
    var {
        promotions,
        bill
    } = data;
    if (!data.singlePromotion) {
        Promotion.find({
            _id: {
                $in: promotions
            },
            minValue: {
                $lte: bill
            },
            maxValue: {
                $gte: bill
            }
        }, function (err, promos) {
            if (err)
                deferred.reject(err);
            if (!promos)
                deferred.reject("Error getting promos from db");
            else {
                var points = 0,
                    spending = 0,
                    discount = 0;
                promos.forEach(function (promo) {
                    points = points + (promo.transaction.points || 0) + (promo.transaction.percent || 0) * bill / 100;
                    spending = spending + (promo.spending.points || 0) + (promo.spending.percent || 0) * bill / 100;
                    if (promo.cashDiscount)
                        discount = discount + (promo.discount.points || 0) + (promo.discount.percent || 0) * bill / 100
                    else
                        points = points + (promo.discount.percent || 0) * bill / 100 + (promo.discount.points || 0)

                })
                points -= spending;

                deferred.resolve({
                    points,
                    spending,
                    discount
                });
            }
        })
    }
    return deferred.promise;
};