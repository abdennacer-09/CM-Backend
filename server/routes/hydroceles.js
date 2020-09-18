const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cons = require('../models/consultation');
const Hydr = require('../models/hydrocele');

router.get('/', async (req, res)=> {
    const hydroceles =  await Hydr.find();
    res.json(hydroceles);
    console.log(hydroceles);
});

router.get('/FilterHydr', async (req, res)=> {
    const hydroceles =  await Hydr.find().populate('consultation').populate('patient');
    res.json(hydroceles);
    console.log(hydroceles);
});

router.get('/FilterHydr/:idPat', async (req, res)=> {
    const ID = req.params.idPat;
    const cons = await Cons.find({patient : ID});
    const hydroceles =  await Hydr.find({consultation : cons });
    res.json(hydroceles);
    console.log(hydroceles);
});

//add hydrocele
router.post('/addHydr', async (req,res) => {

    const NewHydr = new Hydr({
        hydrDr: req.body.hydrDr,
        hydrGch: req.body.hydrGch,
        consultation : req.body.consultation
    });

    await NewHydr.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewHydr);

});

// Supprimer hydrocele

router.delete('/deleteHydr/:HydrId', (req,res) => {
    const ID = req.params.HydrId;
    Hydr.deleteOne({ _id : ID },(err, result) => {
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

// Modifier hydrocele 
router.put('/updateHydr/:HydrId' , (req,res) => {

    const ID = req.params.HydrId;
    const UpdatedHydr = {
        hydrDr: req.body.hydrDr,
        hydrGch: req.body.hydrGch,
    }
    Hydr.updateOne( {_id : ID} , {$set : UpdatedHydr} , (err, result)=>{
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