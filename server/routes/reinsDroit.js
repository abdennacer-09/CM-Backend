const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cons = require('../models/consultation');
const ReinDr = require('../models/reinDroit');

router.get('/', async (req, res)=> {
    const reinsDroit =  await ReinDr.find();
    res.json(reinsDroit);
    console.log(reinsDroit);
});

router.get('/FilterReinDr', async (req, res)=> {
    const reinsDroit =  await ReinDr.find().populate('consultation').populate('patient');
    res.json(reinsDroit);
    console.log(reinsDroit);
});

router.get('/FilterReinDr/:idPat', async (req, res)=> {
    const ID = req.params.idPat;
    const cons = await Cons.find({patient : ID});
    const reinsDroit =  await ReinDr.find({consultation : cons });
    res.json(reinsDroit);
    console.log(reinsDroit);
});

//add Rein droit
router.post('/addReinDr', async (req,res) => {

    const NewReinDr = new ReinDr({
    
        dimensions: req.body.dimensions,
        differenciation: req.body.differenciation,
        dilatation: req.body.dilatation,
        consultation : req.body.consultation
    });

    await NewReinDr.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewReinDr);

});

// Supprimer Rein droit 

router.delete('/deleteReinDr/:ReinDrId', (req,res) => {
    const ID = req.params.ReinDrId;
    ReinDr.deleteOne({ _id : ID },(err, result) => {
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

// Modifier Rein droit
router.put('/updateReinDr/:ReinDrId' , (req,res) => {

    const ID = req.params.ReinDrId;
    const UpdatedReinDr = {
        dimensions: req.body.dimensions,
        differenciation: req.body.differenciation,
        dilatation: req.body.dilatation,
    }
    ReinDr.updateOne( {_id : ID} , {$set : UpdatedReinDr} , (err, result)=>{
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