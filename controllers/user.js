const User = require('../models/user')
const eHandler = require('../helpers/dbHelper.js')
const {check, validationResult} = require('express-validator');

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
    user.save((err,user) => { 
        //called if there is an error with saving to DB
        if(err){
            //console.log(eHandler.errorHandler(err));
            return res.status(400).json({
                error: eHandler.errorHandler(err)
            })
        }
        else{
            //console.log(`User "${user.name}" was succesfully created`);
            user.salt = undefined; //surpresses field from showing in the response
            user.hashed_password = undefined; //but still was added to DB
        }
        res.json({
            user
        })
    })
};