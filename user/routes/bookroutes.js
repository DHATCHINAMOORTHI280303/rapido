const bookcontrollers = require("../controllers/bookcontrollers");

const express = require("express");
const bookrouter = express.Router();
bookrouter.get("/newbook",bookcontrollers.newbooking_get);
bookrouter.post("/newbook",bookcontrollers.newbooking_post);
bookrouter.get("/newbook/request",bookcontrollers.newbookingrequest_get);
bookrouter.post("/newbook/request",bookcontrollers.newbookingrequest_post);

module.exports = bookrouter;