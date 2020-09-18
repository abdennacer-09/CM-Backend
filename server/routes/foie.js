const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cons = require('../models/consultation');
const Foie = require('../models/foie');

router.get('/', async (req, res)=> {
    const foie =  await Foie.find();
    res.json(foie);
    console.log(foie);
});

router.get('/FilterFoie', async (req, res)=> {
    const foie =  await Foie.find().populate('consultation').populate('patient');
    res.json(foie);
    console.log(foie);
});

router.get('/FilterFoie/:idPat', async (req, res)=> {
    const ID = req.params.idPat;
    const cons = await Cons.find({patient : ID});
    const foie =  await Foie.find({consultation : cons });
    //const foie2 = await Foie.find({})
    res.json(foie);
    console.log(foie);

    //Cons.find().populate('patient');
});

//add Foie
router.post('/addFoie', async (req,res) => {

    const NewFoie = new Foie({
        tailleFoi: req.body.tailleFoi,
        structureFoi: req.body.structureFoi,
        contoursFoi: req.body.contoursFoi,
        autresAnomalies: req.body.autresAnomalies,
        consultation : req.body.consultation
    });

    await NewFoie.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewFoie);

});

// Supprimer Foie

router.delete('/deleteFoie/:FoieId', (req,res) => {
    const ID = req.params.FoieId;
    Foie.deleteOne({ _id : ID },(err, result) => {
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

// Modifier Foie
router.put('/updateFoie/:FoieId' , (req,res) => {

    const ID = req.params.FoieId;
    const UpdatedFoie = {
        tailleFoi: req.body.tailleFoi,
        structureFoi: req.body.structureFoi,
        contoursFoi: req.body.contoursFoi,
        autresAnomalies: req.body.autresAnomalies,
    }
    Foie.updateOne( {_id : ID} , {$set : UpdatedFoie} , (err, result)=>{
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
            return;
        }
        console.log(result);
        res.status(500).json(UpdatedFoie);
    });

});


module.exports = router;