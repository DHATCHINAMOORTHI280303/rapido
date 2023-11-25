const express = require("express");
const router = express.Router();
const multer = require("multer");
const driverdetailmodel = require("../models/driverdetailmodel");
const fs = require("fs")
const path = require("path")

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
var upload = multer({
    storage:storage
})
router.get("/",(req,res)=>{
    res.render("index.ejs");
})
router.post("/",upload.any(),async(req,res)=>{
    console.log(req.files);
    console.log(req.files[0].filename)
    await driverdetailmodel.create({
        Profile_pic : {
            data : fs.readFileSync(path.join(__dirname,"..","uploads",req.files[0].filename)),
            contentType : "image/png"
        }
    })
    res.send("added")
})

module.exports = router;