const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true,
    },
    uid:{
        type:String,
        required:true,
    },
    did:{
        type:String,
        required:true,
    },
    Source:{
        type:String,
        required:true,
    },
    Destination:{
        type:String,
        required:true,
    },
    Amount:{
        type:String,
        required:true,
    },
    Payment_status:{
        type:String,
        Default:"false"
    },
})

const Bookings = mongoose.model("bookings",bookingSchema);
module.exports = Bookings;