const mongoose = require("mongoose");
const crypto = require("crypto"); //to hash password
const uuidv1 = require("uuidv1") //gives random string

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

userSchema.virtual("password") //creates virtual variable not stored in DB
.set(function(password){
    this._password = password,
    this.salt = uuidv1(),
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
})

userSchema.methods = {
    encryptPassword: function(password){
        if(!password) return '';
        try{
            return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
        }
        catch(err){
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);