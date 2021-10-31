const mongoose = require("mongoose");

const expenceSchema = new mongoose.Schema({
    group_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group"
    },
    expenses_distribution:[{
        name:String,
        amount:{
            type:Number,
            default:0
        }
    }],
    tot:Number
});


const Resource = mongoose.model("Expenses", expenceSchema);
module.exports = Resource;