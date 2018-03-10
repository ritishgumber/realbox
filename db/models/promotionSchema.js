var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({

    startDate: Date, // start date of the promotion
    endDate: Date, // end date of the promotion
    transaction: {
        percent: Number, //% of the bill to be added as points
        points: Number // fixed value to be added as points
    },
    spending: {
        percent: Number, // % of the bill which can be paid through points
        points: Number // fixed value which can be paid through points
    },
    discount: {
        percent: Number, // % of the discount on the current bill
        points: Number // fixed discount on current bill
    },
    itemIds: [String], // array of itemIds which fall under this promotion | ideally it should be array of object id, but currently we don't have that.
    minValue: Number, // min value of bill 
    maxValue: Number, // max value of bill
    redeemPartially: Boolean, // true: all items in itemIds must be present in the bill
    cashDiscount: Boolean, // true : discount on bill value , false : discount value added as points 
    notApplicableWith: [{
        type: Schema.Types.ObjectId,
        ref: 'Promotion'
    }], // array of  promoIds with which this promo can’t be clubbed
    type:String, //promotion category 
    cardIds:[{
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }]
}, {
    collection: 'promotion'
});

module.exports = mongoose.model("Promotion", schema);