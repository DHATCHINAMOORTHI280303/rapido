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

const database = require("./db");
const authrouter = require("./routes/authroutes");
const bookrouter = require("./routes/bookroutes");
const detailsrouter  = require("./routes/userdetailsroutes");
const authenticate = require("./middleware/authmiddleware");

database.dbconnect();


// mongoose.connect("mongodb://localhost:27017/JWT_auth")
// .then(()=>{app.listen(4000,()=>{
//     console.log("server is running at port 4000")
// })})
// .catch((err)=>{console.log(err)});

app.listen(3000,()=>{
    console.log("server is running on 3000");
})
app.use(authrouter);
app.use(detailsrouter);
app.get("/",authenticate,(req,res)=>{
    // res.sendFile(path.join(__dirname,"views","home.html"))
    res.render("home.ejs");
})
app.use(authenticate,bookrouter);