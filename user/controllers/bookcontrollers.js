
const {db} = require("../db");
const Requests = require("../model/request");
const UserDetail = require("../model/userdetails");
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
            res.cookie("did",driver[0]._id);
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
        uid : req.body.id,
        Name : us.Name,
        did : req.body.did,
        Source : req.body.source,
        Destination:req.body.dest
    })
    console.log(requ);
    // res.redirect("/newbook/request")
    res.status(201).json({reqsend:requ})


}
module.exports.newbookingrequest_get = (req,res)=>{
    res.render("request.ejs");
}