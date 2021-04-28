const jwt= require('jsonwebtoken');
const config = require('config');
const _= require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const {User}= require('../models/user');

router.post('/',async (req,res)=>{
    
    const error = validate(req.body);
    if(error) return res.status(400).send(`Invalid format ${error}`);
    
    let user =await User.findOne({ email:req.body.email });
    if(!user) return res.status(400).send('email or password incorrect !!');

    const validPassword=await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('email or password incorrect !!!');

    const token =user.generateAuthToken();
    res.send(token);
});

function validate(user) {
    const schema = Joi.object({
        email:Joi.string().required().email(),
        password:Joi.string().required()
    });
    const { error, value } = schema.validate(user);
    return error;
}

module.exports = router;
