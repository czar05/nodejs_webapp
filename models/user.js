const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type : String
    },
    email:{
        type: String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error("email is invalid");
            }
        }
    },
    mobile:{
        type: String,
        validate(value){
            if(!validator.MobilePhone(value)){
                throw new error("mobile number is invalid");
            }
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;