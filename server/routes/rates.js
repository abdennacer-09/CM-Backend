const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cons = require('../models/consultation');
const Rat = require('../models/rate');

router.get('/', async (req, res)=> {
    const rates =  await Rat.find();
    res.json(rates);
    console.log(rates);
});

router.get('/FilterRat', async (req, res)=> {
    const rates =  await Rat.find().populate('consultation').populate('patient');
    res.json(rates);
    console.log(rates);
});

router.get('/FilterRat/:idPat', async (req, res)=> {
    const ID = req.params.idPat;
    const cons = await Cons.find({patient : ID});
    const rates =  await Rat.find({consultation : cons });
    res.json(rates);
    console.log(rates);
});

//add Rate
router.post('/addRat', async (req,res) => {

    const NewRat = new Rat({
        tailleRat: req.body.tailleRat,
        structureRat: req.body.structureRat,
        contoursRat: req.body.contoursRat,
        autresAnomaliesRat: req.body.autresAnomaliesRat,
        consultation : req.body.consultation
    });

    await NewRat.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    }); 
    res.status(201).json(NewRat);

});

// Supprimer Rate 

router.delete('/deleteRat/:RatId', (req,res) => {
    const ID = req.params.RatId;
    Rat.deleteOne({ _id : ID },(err, result) => {
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

// Modifier Rate
router.put('/updateRat/:RatId' , (req,res) => {

    const ID = req.params.RatId;
    const UpdatedRat = {
        tailleRat: req.body.tailleRat,
        structureRat: req.body.structureRat,
        contoursRat: req.body.contoursRat,
        autresAnomaliesRat: req.body.autresAnomaliesRat,
    }
    Rat.updateOne( {_id : ID} , {$set : UpdatedRat} , (err, result)=>{
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
            return;
        }
        console.log(result);
        res.status(500).json(UpdatedRat);
    });

});


module.exports = router;