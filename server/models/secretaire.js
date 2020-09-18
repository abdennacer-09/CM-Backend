const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const mongooseUniqueValidator = require('mongoose-unique-validator');

const SecSchema = new Schema ({
    
    nom :{
        type:String
    },
    cin :{
        type:String
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    isAdmin:{
        type: Number
    },
    tel:{
        type: String
    },
    adresse:{
        type: String
    },
    password : {
        type: String,
        required: true
    },
    patients:[{
        type : Schema.Types.ObjectId,
        ref: 'Patient'
    }]

});

//Schema.plugin(mongooseUniqueValidator);
//Sec = User 
module.exports = User = mongoose.model('secretaire', SecSchema);
