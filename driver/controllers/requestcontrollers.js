const events = require("events");
const eventEmitter = new events.EventEmitter();
const {db}= require("../db");
// const mongoose = require("mongoose");
const {ObjectId} = require("mongodb")

module.exports.getrequest_get = async(req,res)=>{
    const cursor = await db.collection("requests").find({did:req.cookies.id});
    const requests = await cursor.toArray();
    console.log(requests);
  

    res.render("request.ejs",{requests});
}
module.exports.accept_get = async(req,res)=>{
    // console.log(req.query.id);
    const rid = new ObjectId(req.query.id);
    console.log(rid);
    const result = await db.collection("requests").findOneAndDelete({_id:rid});
    console.log(result);
    res.status(201).json({result});
}