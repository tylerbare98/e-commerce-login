/*
   This will define all the routes associated with the website
*/

const express = require("express")
const router = express.Router()
var userControllers = require("../controllers/user.js");
var expressValidator = require("../validators/signup.js");



//Handling get requests

//Handling post requests
router.post('/', expressValidator.signup(), userControllers.signup);
router.post('/signin', userControllers.signin);
 
//lets server.js(main file) acess the above post/get requests
module.exports = router