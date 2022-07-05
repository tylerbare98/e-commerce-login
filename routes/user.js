const express = require("express")
const router = express.Router()
var userControllers = require("../controllers/user.js");
var expressValidator = require("../validators/signup.js");
const {check, validationResult} = require('express-validator');
  


//Handling get request
router.post('/', expressValidator.signup(), userControllers.signup);
  
module.exports = router