const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cons = require('../models/consultation');
const ExmCln = require('../models/examen_clinique');
const Genr = require('../models/geniral');
const Appr = require('../models/appareil');


router.get('/', async (req, res)=> {
    const examensCliniques =  await ExmCln.find();
    res.json(examensCliniques);
    console.log(examensCliniques);
});

router.get('/genirals', async (req, res)=> {
    const genirals =  await Genr.find();
    res.json(genirals);
    console.log(genirals);
});

router.post('/addExamCln', async (req,res) => {

    const NewExamClinique = new ExmCln({
        geniral: req.body.geniral,
        rmqGeneral: req.body.rmqGeneral,
        appareil: req.body.appareil,
        rmqAppr : req.body.rmqAppr,
        consultation : req.body.consultation

    });

    await NewExamClinique.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewExamClinique);

});

//add examen geniral

router.post('/addExamGeniral', async (req,res) => {

    const NewExamGeniral = new Genr({
        geniral: req.body.geniral,
        rmqGeneral: req.body.rmqGeneral,
        consultation : req.body.consultation

    });

    await NewExamGeniral.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewExamGeniral);

});

// Supprimer examen geniral

router.delete('/deleteExamenGen/:exmGnId', (req,res) => {
    const ID = req.params.exmGnId;
    Genr.deleteOne({ _id : ID },(err, result) => {
        if(err){
            console.log(err);
            res.status(500).json({
                error : err
            });
            return;
        }
        console.log(result);
        res.status(500).json(Genr);
    })
});

// Modifier examen geniral
router.put('/updateExamenGen/:exmGnId' , (req,res) => {

    const ID = req.params.exmGnId;
    const UpdatedExamenGnr = {
        geniral: req.body.geniral,
        rmqGeneral: req.body.rmqGeneral,
    }
    Genr.updateOne( {_id : ID} , {$set : UpdatedExamenGnr} , (err, result)=>{
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
            return;
        }
        console.log(result);
        res.status(500).json(Genr);
    });

});

//add examen par appareil

router.post('/addExamAppareil', async (req,res) => {

    const NewExamAppereil = new Appr({
        appareil: req.body.appareil,
        rmqAppr : req.body.rmqAppr,
        consultation : req.body.consultation

    });

    await NewExamAppereil.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewExamAppereil);

});

// Modifier Examen Clinique
router.put('/updateExamenCln/:exmCId' , (req,res) => {

    const ID = req.params.exmCId;
    const UpdatedExamenCln = {
        geniral: req.body.geniral,
        rmqGeneral: req.body.rmqGeneral,
        appareil: req.body.appareil,
        rmqAppr : req.body.rmqAppr,
        consultation : req.body.consultation
    }
    ExmCln.updateOne( {_id : ID} , {$set : UpdatedExamenCln} , (err, result)=>{
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
            return;
        }
        console.log(result);
        res.status(500).json(result);
    });

});

// Supprimer Examen Clinique

router.delete('/deleteExamenCln/:exmCId', (req,res) => {
    const ID = req.params.exmCId;
    ExmCln.deleteOne({ _id : ID },(err, result) => {
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