const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cons = require('../models/consultation');
const VscBil = require('../models/vsbiliaire ');

router.get('/', async (req, res)=> {
    const vesiculeBiliare =  await VscBil.find();
    res.json(vesiculeBiliare);
    console.log(vesiculeBiliare);
});

router.get('/FilterVscBil', async (req, res)=> {
    const vesiculeBiliare =  await VscBil.find().populate('consultation').populate('patient');
    res.json(vesiculeBiliare);
    console.log(vesiculeBiliare);
});

router.get('/FilterVscBil/:idPat', async (req, res)=> {
    const ID = req.params.idPat;
    const cons = await Cons.find({patient : ID});
    const vesiculeBiliare =  await VscBil.find({consultation : cons });
    res.json(vesiculeBiliare);
    console.log(vesiculeBiliare);
});

//add Vesicule Biliaire
router.post('/addVscBil', async (req,res) => {

    const NewVscBil = new VscBil({
        tailleVsB: req.body.tailleVsB,
        paroisVsB: req.body.paroisVsB,
        formeVsB: req.body.formeVsB,
        autresVsB: req.body.autresVsB,
        consultation : req.body.consultation
    });

    await NewVscBil.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewVscBil);

});

// Supprimer Vesicule Biliaire

router.delete('/deleteVscBil/:VscBilId', (req,res) => {
    const ID = req.params.VscBilId;
    VscBil.deleteOne({ _id : ID },(err, result) => {
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

// Modifier Vesicule Biliaire
router.put('/updateVscBil/:VscBilId' , (req,res) => {

    const ID = req.params.VscBilId;
    const UpdatedVscBil = {
        tailleVsB: req.body.tailleVsB,
        paroisVsB: req.body.paroisVsB,
        formeVsB: req.body.formeVsB,
        autresVsB: req.body.autresVsB,
    }
    VscBil.updateOne( {_id : ID} , {$set : UpdatedVscBil} , (err, result)=>{
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
            return;
        }
        console.log(result);
        res.status(500).json(UpdatedVscBil);
    });

});


module.exports = router;