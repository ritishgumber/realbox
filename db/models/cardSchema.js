var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    label: {
        type: String,
        required: true
    },
    validity: { // in no. of days
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }

}, {
    collection: 'card'
});

module.exports = mongoose.model("Card", schema);