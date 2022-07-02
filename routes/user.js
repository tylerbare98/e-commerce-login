
const express = require("express")
const router = express.Router()

var userControllers = require("../controllers/user.js");
  
//Handling get request
router.get('/', userControllers.testFunction)
  
module.exports = router