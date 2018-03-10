var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
	phone : {
        type:Number,
        required:true
    }, totalSpending: {
        type:Number,
        required:true,default:0
    }
	
},{ collection : 'user' });

module.exports = mongoose.model("User",schema);