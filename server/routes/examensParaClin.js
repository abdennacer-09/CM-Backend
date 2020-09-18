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

router.get('/Bio', async (req, res)=> {
    const examensBiologies =  await Bio.find();
    res.json(examensBiologies);
    console.log(examensBiologies);
});

router.get('/FilterBio', async (req, res)=> {
    const examensBiologies =  await Bio.find().populate('consultation').populate('patient');
    res.json(examensBiologies);
    console.log(examensBiologies);
});

router.get('/FilterBio/:idPat', async (req, res)=> {
    const ID = req.params.idPat;
    const cons = await Cons.find({patient : ID});
    const examensBiologies =  await Bio.find({consultation : cons });
    res.json(examensBiologies);
    console.log(examensBiologies);
});

router.get('/Radio', async (req, res)=> {
    const examensRadiologie =  await Radio.find();
    res.json(examensRadiologie);
    console.log(examensRadiologie);
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
        NfsPq: req.body.NfsPq,
        TSHus: req.body.TSHus,
        T3: req.body.T3,
        T4: req.body.T4,
        Glycemie: req.body.Glycemie,
        HBGA1c: req.body.HBGA1c,
        LDL: req.body.LDL,
        HDL: req.body.HDL,
        TG: req.body.TG,
        CT: req.body.CT,
        PSA: req.body.PSA,
        TP: req.body.TP,
        TCK: req.body.TCK,
        INR: req.body.INR,
        Groupage: req.body.Groupage,
        TPHA: req.body.TPHA,
        VDRL: req.body.VDRL,
        SerologieToxo: req.body.SerologieToxo,
        SerologieRub: req.body.SerologieRub,
        AutresBio : req.body.AutresBio,
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

// Supprimer Examen Biologie

router.delete('/deleteExamBio/:BioId', (req,res) => {
    const ID = req.params.BioId;
    Bio.deleteOne({ _id : ID },(err, result) => {
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

// Modifier Examen Biologie
router.put('/updateExamenBio/:BioId' , (req,res) => {

    const ID = req.params.BioId;
    const UpdatedExamBio = {
        NfsPq: req.body.NfsPq,
        TSHus: req.body.TSHus,
        T3: req.body.T3,
        T4: req.body.T4,
        Glycemie: req.body.Glycemie,
        HBGA1c: req.body.HBGA1c,
        LDL: req.body.LDL,
        HDL: req.body.HDL,
        TG: req.body.TG,
        CT: req.body.CT,
        PSA: req.body.PSA,
        TP: req.body.TP,
        TCK: req.body.TCK,
        INR: req.body.INR,
        Groupage: req.body.Groupage,
        TPHA: req.body.TPHA,
        VDRL: req.body.VDRL,
        SerologieToxo: req.body.SerologieToxo,
        SerologieRub: req.body.SerologieRub,
        AutresBio : req.body.AutresBio
    }
    Bio.updateOne( {_id : ID} , {$set : UpdatedExamBio} , (err, result)=>{
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

// Supprimer Examen Radiologie

router.delete('/deleteExamRdio/:RadioId', (req,res) => {
    const ID = req.params.RadioId;
    Radio.deleteOne({ _id : ID },(err, result) => {
        if(err){
            console.log(err);
            res.status(500).json({
                error : err
            });
            return;
        }
        console.log(result);
        res.status(500).json(Radio);
    })
});

// Modifier Examen Radiologie
router.put('/updateExamenRadio/:RadioId' , (req,res) => {

    const ID = req.params.RadioId;
    const UpdatedExamRadio = {
        radiologie: req.body.radiologie,
        rmqRadio: req.body.rmqRadio,
    }
    Radio.updateOne( {_id : ID} , {$set : UpdatedExamRadio} , (err, result)=>{
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
            return;
        }
        console.log(result);
        res.status(500).json(UpdatedExamRadio);
    });

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