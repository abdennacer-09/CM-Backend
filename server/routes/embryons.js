const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cons = require('../models/consultation');
const Embr = require('../models/embryon');

router.get('/', async (req, res)=> {
    const embryons =  await Embr.find();
    res.json(embryons);
    console.log(embryons);
});

router.get('/FilterEmbr', async (req, res)=> {
    const embryons =  await Embr.find().populate('consultation').populate('patient');
    res.json(embryons);
    console.log(embryons);
});

router.get('/FilterEmbr/:idPat', async (req, res)=> {
    const ID = req.params.idPat;
    const cons = await Cons.find({patient : ID});
    const embryons =  await Embr.find({consultation : cons });
    res.json(embryons);
    console.log(embryons);
});

//add Embryon
router.post('/addEmbryon', async (req,res) => {

    const NewEmbryon = new Embr({
        positionEmb: req.body.positionEmb,
        activiteCardiaque: req.body.activiteCardiaque,
        fcActiv: req.body.fcActiv,
        mouvementFoetus: req.body.mouvementFoetus,
        liquideAmniotique: req.body.liquideAmniotique,
        placenta1: req.body.placenta1,
        placenta2: req.body.placenta2,
        placenta3: req.body.placenta3,
        ageGestationnel: req.body.ageGestationnel,
        datePresume: req.body.datePresume,
        consultation : req.body.consultation

    });

    await NewEmbryon.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewEmbryon);

});

// Supprimer Embryon

router.delete('/deleteEmbryon/:EmbrId', (req,res) => {
    const ID = req.params.EmbrId;
    Embr.deleteOne({ _id : ID },(err, result) => {
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

// Modifier Embryon
router.put('/updateEmbryon/:EmbrId' , (req,res) => {

    const ID = req.params.EmbrId;
    const UpdatedEmbryon = {
        positionEmb: req.body.positionEmb,
        activiteCardiaque: req.body.activiteCardiaque,
        fcActiv: req.body.fcActiv,
        mouvementFoetus: req.body.mouvementFoetus,
        liquideAmniotique: req.body.liquideAmniotique,
        placenta1: req.body.placenta1,
        placenta2: req.body.placenta2,
        placenta3: req.body.placenta3,
        ageGestationnel: req.body.ageGestationnel,
        datePresume: req.body.datePresume,
    }
    Embr.updateOne( {_id : ID} , {$set : UpdatedEmbryon} , (err, result)=>{
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