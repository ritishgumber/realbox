var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    points: {
        type: Number,
        required: true,
        default: 0
    }, // current point balance
    pointsSpent: {
        type: Number,
        required: true,
        default: 0
    }, // total points spent 
    cardId: {
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }, // id property of card object
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, // id property of User object

}, {
    collection: 'loyalty'
});

module.exports = mongoose.model("Loyalty", schema);