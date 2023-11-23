
const {db} = require("../db");
var driver;
module.exports.newbooking_get=(req,res)=>{

    driver = [];
    res.render("book.ejs",{driver})
}
module.exports.newbooking_post=async(req,res)=>{
    try {
        const cursor = db.collection("available_drivers").find({
            $and:[{vehicle:req.body.vehicle},{cur_location:req.body.source}]
        });
        driver = await cursor.toArray();

        // console.log("from dric" ,driver[0].name)

        if(driver){
            console.log("yes",driver);
            res.render("book.ejs",{driver});
            // res.render("home.ejs");
        }
        // res.status(201).json({driver});
    } catch (error) {
        console.log(error)
    }

   

}