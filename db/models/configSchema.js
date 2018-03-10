var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    name: String,
    cards: [{
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }],
    exclusivePromos: [{
        type: Schema.Types.ObjectId,
        ref: 'Promotion'
    }],
    defaultCard: {
        type: Schema.Types.ObjectId,
        red: 'Card'
    },
    promotionTypes:{type:Schema.Types.Mixed,default:{"signup":[],"recharge":[],"bill":[],"firstOrder":[]}},
    promotionCategory: {
        type:Schema.Types.Mixed
    },
    conversionRate: {
        recharge: [{
            cardId: String,
            value: Number
        }],
        redeem: [{
            cardId: String,
            value: Number
        }]
    }
}, {
    collection: 'settings'
});

module.exports = mongoose.model("Settings", schema);