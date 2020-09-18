const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cons = require('../models/consultation');
const TesticGch = require('../models/TesticuleGch');

router.get('/', async (req, res)=> {
    const testiculesGauche =  await TesticGch.find();
    res.json(testiculesGauche);
    console.log(testiculesGauche);
});

router.get('/FilterTesticGch', async (req, res)=> {
    const testiculesGauche =  await TesticGch.find().populate('consultation').populate('patient');
    res.json(testiculesGauche);
    console.log(testiculesGauche);
});

router.get('/FilterTesticGch/:idPat', async (req, res)=> {
    const ID = req.params.idPat;
    const cons = await Cons.find({patient : ID});
    const testiculesGauche =  await TesticGch.find({consultation : cons });
    res.json(testiculesGauche);
    console.log(testiculesGauche);
});


//add Tsticule Gauche
router.post('/addTesticGch', async (req,res) => {

    const NewTesticGch = new TesticGch({
        mmGch: req.body.mmGch,
        contoursGch: req.body.contoursGch,
        echostructureGch: req.body.echostructureGch,
        AvEcDpCGch: req.body.AvEcDpCGch,
        consultation : req.body.consultation
    });

    await NewTesticGch.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewTesticGch);

});

// Supprimer Tsticule Gauche 

router.delete('/deleteTesticGch/:TesticGchId', (req,res) => {
    const ID = req.params.TesticGchId;
    TesticGch.deleteOne({ _id : ID },(err, result) => {
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

// Modifier Tsticule Gauche 
router.put('/updateTesticGch/:TesticGchId' , (req,res) => {

    const ID = req.params.TesticGchId;
    const UpdatedTesticGch = {
        mmGch: req.body.mmGch,
        contoursGch: req.body.contoursGch,
        echostructureGch: req.body.echostructureGch,
        AvEcDpCGch: req.body.AvEcDpCGch,
    }
    TesticGch.updateOne( {_id : ID} , {$set : UpdatedTesticGch} , (err, result)=>{
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


module.exports = router;