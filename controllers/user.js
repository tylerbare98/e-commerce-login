/*
    lets you define functions for individual routes to execute to keep routes files clean
*/

const User = require('../models/user')
const eHandler = require('../helpers/dbHelper.js')
const {check, validationResult} = require('express-validator');

//-------------------function when the user wants to try to sign up-------------------------------------
exports.signup = function(req, res) {
    //req.body should be JSON matching the user schema for the DB
    const user = new User(req.body); 

    //code to handle errors by validation checks in validators/signup.js
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //console.log(error: errors.array()); 
        return res.status(400).json({error : errors.array()[0].msg});
    }

    //saves new user. 
    User.save((err,user) => { 
        //called if there is an error with saving to DB
        if(err){
            //console.log(eHandler.errorHandler(err));
            return res.status(400).json({error: eHandler.errorHandler(err)
            })
        }
        else{
            //console.log(`User "${user.name}" was succesfully created`);
            user.salt = undefined; //surpresses field from showing in the response
            user.hashed_password = undefined; //but still was added to DB
        }
        //return JSON of the user, with the salt and hash hidden
        res.json({
            user
        })
    })
};

//-------------------function when the user wants to try to sign in-------------------------------------
exports.signin = function(req, res) {
    //find the user based on email
    const {email, password} = req.body;
    User.findOne({email}, function(err, user) {
        if (err || !user) { 
            return res.status(400).json({ error: "This email does not exist. Please signup." });
         }

        //if user is found, make sure the email and password match
        if (user) {
            
            if(user.comparePassword(password)){
                //console.log("password matches")
            } 
            else{
                //console.log("wrong password")
                return res.status(400).json({ error: "Wrong password. Try again." });
            }
                
        } 
    })
};