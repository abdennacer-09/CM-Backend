const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const router = express.Router();
const Rdv = require('./rendezVous');

const patientSchema = mongoose.Schema({
    nom :{
        type : String
    },
    cin : {
        type: String
    },
    prenom:{
        type:String
    },
    sexe:{
        type: String
    },
    mituelle:{
        type: String
    },
    adresse:{
        type:String
    },
    profession:{
        type: String
    },
    tel: {
        type: String
    },
    age: {
        type: Number
    },
    sitFam:{
        type:String
    },
    dateNaissance:{
        type: Date
    },
    secretaires:[{
        type: Schema.Types.ObjectId,
        ref: 'secretaire',
    }]
    
});

/*patientSchema.pre('remove', async function(next){
    const patient = this 
    await Rdv.deleteMany({ patient: patient._id })
    next()
});*/


module.exports = mongoose.model('Patient', patientSchema);