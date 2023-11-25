const express = require("express");
const app = express()
const bp = require("body-parser");
const path = require("path");
const authrouter = require("./routes/authroutes");
const detailsrouter  = require("./routes/driverdetailsroutes");
const requestrouter = require("./routes/requestroutes");
const activerouter = require("./routes/activeroutes");
const authenticate = require("./middleware/authmiddleware");
const cookieparser = require("cookie-parser");
const cors = require("cors")
// const events = require("events");
const database = require("./db");
database.dbconnect();


app.set("view engine","ejs");
app.engine('ejs', require('ejs').__express);
app.set('view options', {
    layout: false
});
app.set("views",path.join(__dirname,"views"));
app.use(cors());
app.use(bp.urlencoded({extended:true}));
app.use(bp.json());
app.use(cookieparser());




app.use(authrouter);
app.use(detailsrouter);
app.get("/",authenticate,(req,res)=>{
    res.render("home.ejs");
})
app.use(activerouter);
app.use(requestrouter);

// const eventEmitter = new events.EventEmitter();

// Endpoint to trigger an event
// app.post("/request", (req, res) => {
//     console.log("event triggered")
//     console.log(req.body.dest);
//     console.log(req.body.id);
//     eventEmitter.emit("customEvent", { message: "Event triggered from Server 4000" });
//     res.send("Event triggered successfully!");
// });

// eventEmitter.on("customEvent", (data) => {
//     console.log("Received event:", data.message);
// });
app.listen(4000,()=>{
    console.log("server is running on 4000D");
})