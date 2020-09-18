const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cons = require('../models/consultation');
const AtrRad = require('../models/autreRadio');

router.get('/', async (req, res)=> {
    const autresRadio =  await AtrRad.find();
    res.json(autresRadio);
    console.log(autresRadio);
});

router.get('/FilterAtrRad', async (req, res)=> {
    const autresRadio =  await AtrRad.find().populate('consultation').populate('patient');
    res.json(autresRadio);
    console.log(autresRadio);
});

router.get('/FilterAtrRad/:idPat', async (req, res)=> {
    const ID = req.params.idPat;
    const cons = await Cons.find({patient : ID});
    const autresRadio =  await AtrRad.find({consultation : cons });
    res.json(autresRadio);
    console.log(autresRadio);
});

//add autre radio
router.post('/addAutreRadio', async (req,res) => {

    const NewAutreRad = new AtrRad({
        ecg: req.body.ecg,
        radioThoracique: req.body.radioThoracique,
        scanner: req.body.scanner,
        irm: req.body.irm,
        consultation : req.body.consultation
    });

    await NewAutreRad.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewAutreRad);

});

// Supprimer autre radio

router.delete('/deleteAutreRadio/:AtrRadId', (req,res) => {
    const ID = req.params.AtrRadId;
    AtrRad.deleteOne({ _id : ID },(err, result) => {
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

// Modifier autre radio
router.put('/updateAutreRadio/:AtrRadId' , (req,res) => {

    const ID = req.params.AtrRadId;
    const UpdatedAutreRad = {
        ecg: req.body.ecg,
        radioThoracique: req.body.radioThoracique,
        scanner: req.body.scanner,
        irm: req.body.irm,
    }
    AtrRad.updateOne( {_id : ID} , {$set : UpdatedAutreRad} , (err, result)=>{
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