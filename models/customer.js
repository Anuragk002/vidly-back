const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    isGold:{
        type:Boolean,
        default:false
    },
    phone:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
});
const Customer=mongoose.model('Customer',customerSchema);

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        phone:Joi.string().required().min(3).max(50),
        isGold:Joi.boolean()
    });
    const { error, value } = schema.validate(customer);
    return error;
}

exports.Customer=Customer;
exports.validate=validateCustomer;