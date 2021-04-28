const mongoose = require('mongoose');
const Joi = require('joi');
const jwt= require('jsonwebtoken');
const config = require('config');

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:3,
        maxlength:1024
    },
    isAdmin: Boolean
});
userSchema.methods.generateAuthToken = function () {
    const token =jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get('jwtPrivateKey'));    
    return token;
}

const User=mongoose.model('User',userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required().required().min(3).max(50),
        email:Joi.string().required().email(),
        password:Joi.string().required()
    });
    const { error, value } = schema.validate(user);
    return error;
}

exports.User=User;
exports.validate=validateUser;