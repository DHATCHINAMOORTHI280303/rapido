const mongoose = require("mongoose");
const requestSchema = new mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    did:{
        type:String,
        required:true
    },
    Source:{
        type:String,
        required:true

    },
    Destination:{
        type:String,
        required:true
    }
})
const Requests = mongoose.model("requests",requestSchema);
module.exports = Requests;