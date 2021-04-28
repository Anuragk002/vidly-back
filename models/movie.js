const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema}= require('./genre');

const movieSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:50
    },
    genre:{
        type:genreSchema,
        required:true
    },
    numberInStock:{
        type:Number,
        required:true
    },
    dailyRentalRate:{
        type:Number,
    }
});
const Movie=mongoose.model('Movie',movieSchema);


function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().required().required().min(3).max(50),
        genreId:Joi.objectId().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number()
    });
    const { error, value } = schema.validate(movie);
    return error;
}

exports.Movie=Movie;
exports.validate=validateMovie;