const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cons = require('../models/consultation');
const VoiBil = require('../models/voiesBiliaire ');

router.get('/', async (req, res)=> {
    const voiesBiliaires =  await VoiBil.find();
    res.json(voiesBiliaires);
    console.log(voiesBiliaires);
});

router.get('/FilterVoiBil', async (req, res)=> {
    const voiesBiliaires =  await VoiBil.find().populate('consultation').populate('patient');
    res.json(voiesBiliaires);
    console.log(voiesBiliaires);
});

router.get('/FilterVoiBil/:idPat', async (req, res)=> {
    const ID = req.params.idPat;
    const cons = await Cons.find({patient : ID});
    const voiesBiliaires =  await VoiBil.find({consultation : cons });
    res.json(voiesBiliaires);
    console.log(voiesBiliaires);
});

//add Voies Biliaires
router.post('/addVoiBil', async (req,res) => {

    const NewVoiBil = new VoiBil({
        intrahEpatique: req.body.intrahEpatique,
        extrahepatique: req.body.extrahepatique,
        consultation : req.body.consultation
    });

    await NewVoiBil.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    }); 
    res.status(201).json(NewVoiBil);

});

// Supprimer Voies Biliaires 

router.delete('/deleteVoiBil/:VoiBilId', (req,res) => {
    const ID = req.params.VoiBilId;
    VoiBil.deleteOne({ _id : ID },(err, result) => {
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

// Modifier Voies Biliaires
router.put('/updateVoiBil/:VoiBilId' , (req,res) => {

    const ID = req.params.VoiBilId;
    const UpdatedVoiBil = {
        intrahEpatique: req.body.intrahEpatique,
        extrahepatique: req.body.extrahepatique,
    }
    VoiBil.updateOne( {_id : ID} , {$set : UpdatedVoiBil} , (err, result)=>{
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
            return;
        }
        console.log(result);
        res.status(500).json(UpdatedVoiBil);
    });

});


module.exports = router;