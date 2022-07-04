const User = require('../models/user')
const eHandler = require('../helpers/dbHelper.js')

exports.signup = function(req, res) {
    //req.body should be JSON matching the user schema for the DB
    const user = new User(req.body); 
    //saves new user. 
    user.save((err,user) => { 
        //called if there is an error with saving to DB
        if(err){
            //console.log(err);
            console.log(eHandler.errorHandler(err));
        }
        else{
            console.log(`User "${user.name}" was succesfully created`);
            user.salt = undefined; //surpresses field from showing in the response
            user.hashed_password = undefined; //but still was added to DB
            res.json({
                user
        })
        }
    })
};