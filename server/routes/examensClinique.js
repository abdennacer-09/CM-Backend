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

router.get('/appareil', async (req, res)=> {
    const appareils =  await Appr.find();
    res.json(appareils);
    console.log(appareils);
});

router.get('/FilterAppareil', async (req, res)=> {
    const appareils =  await Appr.find().populate('consultation').populate('patient');
    res.json(appareils);
    console.log(appareils);
});

router.get('/FilterAppareil/:idPat', async (req, res)=> {
    const ID = req.params.idPat;
    const cons = await Cons.find({patient : ID});
    const appareils =  await Appr.find({consultation : cons });
    res.json(appareils);
    console.log(appareils);
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
        ta: req.body.ta,
        poids: req.body.poids,
        gpp: req.body.gpp,
        hu: req.body.hu,
        fc: req.body.fc,
        gaj: req.body.gaj,
        temperature: req.body.temperature,
        omi: req.body.omi,
        patient : req.body.patient

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
        ta: req.body.ta,
        poids: req.body.poids,
        gpp: req.body.gpp,
        hu: req.body.hu,
        fc: req.body.fc,
        gaj: req.body.gaj,
        temperature: req.body.temperature,
        omi: req.body.omi,
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

        abdominal: req.body.abdominal,
        pleuropulmonaire: req.body.pleuropulmonaire,
        cardiovasculaire : req.body.cardiovasculaire,
        gynecologique: req.body.gynecologique,
        osteoarticulaire : req.body.osteoarticulaire,
        reste : req.body.reste,
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

// Supprimer examen appareil

router.delete('/deleteExmAppareil/:exmPrId', (req,res) => {
    const ID = req.params.exmPrId;
    Appr.deleteOne({ _id : ID },(err, result) => {
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

// Modifier examen appareil
router.put('/updateExmAppareil/:exmAprId' , (req,res) => {

    const ID = req.params.exmAprId;
    const UpdatedExmAppareil = {
        abdominal: req.body.abdominal,
        pleuropulmonaire: req.body.pleuropulmonaire,
        cardiovasculaire : req.body.cardiovasculaire,
        gynecologique: req.body.gynecologique,
        osteoarticulaire : req.body.osteoarticulaire,
        reste : req.body.reste,
    }
    Appr.updateOne( {_id : ID} , {$set : UpdatedExmAppareil} , (err, result)=>{
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