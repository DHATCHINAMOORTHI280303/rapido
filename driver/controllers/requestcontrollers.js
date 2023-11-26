const events = require("events");
const eventEmitter = new events.EventEmitter();
const {db}= require("../db");
// const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");
const Bookings = require("../model/booking");

module.exports.getrequest_get = async(req,res)=>{
    const cursor1 = await db.collection("requests").find({$and:[{did:req.cookies.id},{Accept:'false'}]});
    const requests = await cursor1.toArray();
    const cursor2 = await db.collection("requests").find({$and:[{did:req.cookies.id},{Accept:'true'}]});
    const accepts = await cursor2.toArray();
    console.log(requests);
    console.log(accepts);
  

    res.render("request.ejs",{requests,accepts});
}
module.exports.accept_get = async(req,res)=>{
    // console.log(req.query.id);
    const rid = new ObjectId(req.query.id);
    console.log(rid);
    const reque = await db.collection("requests").findOne({_id:rid});
    const result = await db.collection("requests").updateOne({_id:{$eq:rid}},{$set:{Accept:"true"}});
    Bookings.create({
        _id:rid,
        uid:reque.uid,
        did:reque.did,
        Source:reque.Source,
        Destination:reque.Destination,
        Amount:"100"
    })

    
    console.log(result);
    res.status(201).json({result});
}
module.exports.cancel_get = async(req,res)=>{
    const rid = new ObjectId(req.query.id);
    console.log("rid",rid);
    const result = await db.collection("requests").deleteOne({_id:rid});
    // await db.collection("bookings").find({$and:[{_id:req.query.rid},{Payment_status:"true"}]});
 

    const book = await db.collection("bookings").deleteOne({_id:req.query.rid});
    console.log(book);
    console.log(result);
    res.status(201).json({result});
    
}