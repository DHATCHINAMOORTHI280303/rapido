const mongoose = require("mongoose");
async function dbconnect(){
    mongoose.connect("mongodb://localhost:27017/JWT_auth")
.then(()=>{console.log("connected to db")})
.catch((err)=>{console.log(err)});

}

const db = mongoose.connection;

module.exports = {dbconnect,db};
