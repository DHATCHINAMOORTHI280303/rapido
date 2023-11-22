const express = require("express");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const bp = require("body-parser");
const path = require("path");
const app = express();


app.set("view engine","ejs");
app.engine('ejs', require('ejs').__express);
app.set('view options', {
    layout: false
});
app.set("views",path.join(__dirname,"views"));


app.use(express.json());
app.use(cookieparser());
app.use(bp.urlencoded({extended:true}));


const authrouter = require("./routes/authroutes");
const authenticate = require("./middleware/authmiddleware");
mongoose.connect("mongodb://localhost:27017/JWT_auth")
.then(()=>{app.listen(4000,()=>{
    console.log("server is running at port 4000")
})})
.catch((err)=>{console.log(err)});
app.use(authrouter);
app.get("/",authenticate,(req,res)=>{
    // res.sendFile(path.join(__dirname,"views","home.html"))
    res.render("home.ejs");
})
