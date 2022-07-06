/*
    This file creates a Schema for a user, including password logic
*/

const mongoose = require("mongoose");
const crypto = require("crypto"); //to hash password
const uuidv1 = require("uuidv1") //gives random string

//MongoDB schema represents the structure of document; completely or just a portion of the document
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: 32
    },
    hashed_password:{
        type: String,
        trim: true
    },
    salt: String,
    role:{
        type: Number,
        defalt: 0 
    },
    history:{
        type: Array,
        default: []
    }
},{timestamps: true})

//creates virtual variable not stored in DB
userSchema.virtual("password") 
.set(function(password){
    this._password = password,
    this.salt = uuidv1(),
    this.hashed_password = this.hashPassword(password)
})
.get(function(){
    return this._password
})

//functions associated with this schema
userSchema.methods = {
    //creates hash of a password with salt
    hashPassword: function(password){
        if(!password) return '';
        try{
            return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
        }
        catch(err){
            return "";
        }
    },
    //creates hash of password and see if it eqauls the previosuly created hash
    comparePassword: function(password){
        var passHash = this.hashPassword(password);
        return(passHash === this.hashed_password)
        //console.log(this.hashed_password);
        //console.log(passHash);
    }
}

//so other files can use this file (:
module.exports = mongoose.model("User", userSchema);