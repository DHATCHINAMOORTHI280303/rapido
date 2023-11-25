const express = require("express");
const requestrouter = express.Router();
const requestcontrollers = require("../controllers/requestcontrollers");
requestrouter.get("/request",requestcontrollers.getrequest_get)
requestrouter.get("/accept",requestcontrollers.accept_get)
// requestrouter.post("/request",requestcontrollers.getrequest_post);
module.exports = requestrouter;