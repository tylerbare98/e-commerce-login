const express = require("express")
const router = express.Router()

var userControllers = require("../controllers/user.js");
  
//Handling get request
router.post('/', userControllers.signup)
  
module.exports = router