const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SecSchema = new Schema ({
    nom :{
        type:String
    },
    prenom :{
        type: String
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        require: true
    },
    patients:[{
        type : Schema.Types.ObjectId,
        ref: 'Patient'
    }]

});


//Sec = User 
module.exports = User = mongoose.model('secretaire', SecSchema);
