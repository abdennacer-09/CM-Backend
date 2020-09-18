const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cons = require('../models/consultation');
const ExmCln = require('../models/examen_clinique');
const ExmParCln = require('../models/examen_par_clin');
const Bio = require('../models/biologie');
const Radio = require('../models/radiologie');


router.get('/', async (req, res)=> {
    const examensParaCliniques =  await ExmParCln.find();
    res.json(examensParaCliniques);
    console.log(examensParaCliniques);
});

router.post('/addExamParaCln', async (req,res) => {

    const NewExamParaClinique = new ExmParCln({
        biologie: req.body.biologie,
        rmqBiologie: req.body.rmqBiologie,
        radiologie: req.body.radiologie,
        rmqRadio : req.body.rmqRadio,
        consultation : req.body.consultation
    });

    await NewExamParaClinique.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewExamParaClinique);

});

//add exam Biologie
router.post('/addExamBiologie', async (req,res) => {

    const NewExamBiologie = new Bio({
        biologie: req.body.biologie,
        rmqBiologie: req.body.rmqBiologie,
        consultation : req.body.consultation
    });

    await NewExamBiologie.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewExamBiologie);

});

//add exam Radlogie
router.post('/addExamRadiologie', async (req,res) => {

    const NewExamRadiologie = new Radio({
        radiologie: req.body.radiologie,
        rmqRadio : req.body.rmqRadio,
        consultation : req.body.consultation
    });

    await NewExamRadiologie.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewExamRadiologie);

});

// Modifier Examen Para Clinique
router.put('/updateExamenParaCln/:exmParaClId' , (req,res) => {

    const ID = req.params.exmParaClId;
    const UpdatedExamenParaCln = {
        biologie: req.body.biologie,
        rmqBiologie: req.body.rmqBiologie,
        radiologie: req.body.radiologie,
        rmqRadio : req.body.rmqRadio,
        consultation : req.body.consultation
    }
    ExmParCln.updateOne( {_id : ID} , {$set : UpdatedExamenParaCln} , (err, result)=>{
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
            return;
        }
        console.log(result);
        res.status(500).json(UpdatedExamenParaCln);
    });

});

// Supprimer Examen Para Clinique

router.delete('/deleteExamenParaCln/:exmParaClId', (req,res) => {
    const ID = req.params.exmParaClId;
    ExmParCln.deleteOne({ _id : ID },(err, result) => {
        if(err){
            console.log(err);
            res.status(500).json({
                error : err
            });
            return;
        }
        console.log(result);
        res.status(500).json(result);
    })
});

module.exports = router;