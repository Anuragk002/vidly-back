const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    }
});
const Genre=mongoose.model('Genre',genreSchema);

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().required().required().min(3).max(15)
    });
    const { error, value } = schema.validate(genre);
    return error;
}

exports.genreSchema=genreSchema;
exports.Genre=Genre;
exports.validate=validateGenre;