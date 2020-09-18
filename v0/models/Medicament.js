const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicSchema = new Schema ({
    nom :{
        type: String
    },
    posologie :{
        type: String
    }
});

module.exports = mongoose.model('Medicaments', MedicSchema);