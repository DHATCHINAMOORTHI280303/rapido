
const {db} = require("../db");
const Requests = require("../model/request");
const UserDetail = require("../model/userdetails");
const {ObjectId} = require("mongodb");
var driver;
module.exports.newbooking_get=(req,res)=>{

    driver = [];
    res.render("book.ejs",{driver})
}
module.exports.newbooking_post=async(req,res)=>{
    try {
        
        const cursor = db.collection("available_drivers").find({
            $and:[{Vehicle:req.body.vehicle},{Cur_location:req.body.source}]
        });
        driver = await cursor.toArray();

        // console.log("from dric" ,driver[0].name)

        if(driver){
            console.log("yes",driver);
            console.log(driver[0]._id);
            res.cookie("dest",req.body.destination);
            res.cookie("source",req.body.source);
            // res.cookie("did",driver[0]._id);
            res.render("book.ejs",{driver});
            // res.render("home.ejs");
        }
        // res.status(201).json({driver});
    } catch (error) {
        console.log(error)
    }

   

}
module.exports.newbookingrequest_post = async(req,res)=>{
    const us = await UserDetail.findOne({_id:req.cookies.id});
   const requ =  await Requests.create({
        uid : req.cookies.id,
        Name : us.Name,
        did : req.body.did,
        Source : req.body.source,
        Destination:req.body.dest,
        // Vehicle:req.body.vehicle
    })
    console.log(requ);
    // res.redirect("/newbook/request")
    res.status(201).json({reqsend:requ})


}
module.exports.newbookingrequest_get = async(req,res)=>{
    const cursor = await db.collection("requests").find({$and:[{uid:req.cookies.id},{Accept:"true"}]});
 
    // console.log(cursor);
    var result = [];
    if(cursor){
        result = await cursor.toArray();
        console.log(result)

    }
    res.render("request.ejs",{result});
}

module.exports.cancel_get = async(req,res)=>{
    const rid = new ObjectId(req.query.rid);
    console.log("rid",rid);
    const result = await db.collection("requests").deleteOne({_id:rid})
    const book = await db.collection("bookings").deleteOne({_id:req.query.rid});
    console.log(book);
    console.log(result);
    res.status(201).json({result});
    
}
module.exports.bookinghistory_get = async(req,res)=>{
    const cursor = await db.collection("bookings").find({$and:[{uid:req.cookies.id},{Payment_status:"true"}]});
 
    const history = await cursor.toArray();
    console.log(history);
    res.render("bookinghistory.ejs",{history});
}