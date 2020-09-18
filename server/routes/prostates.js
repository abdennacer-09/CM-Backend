const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cons = require('../models/consultation');
const Prost = require('../models/prostate');

router.get('/', async (req, res)=> {
    const prostates =  await Prost.find();
    res.json(prostates);
    console.log(prostates);
});

router.get('/FilterProst', async (req, res)=> {
    const prostates =  await Prost.find().populate('consultation').populate('patient');
    res.json(prostates);
    console.log(prostates);
});

router.get('/FilterProst/:idPat', async (req, res)=> {
    const ID = req.params.idPat;
    const cons = await Cons.find({patient : ID});
    const prostates =  await Prost.find({consultation : cons });
    res.json(prostates);
    console.log(prostates);
});

//add  Prostate
router.post('/addProstate', async (req,res) => {

    const NewProstate = new Prost({
        dimensionsPrs: req.body.dimensionsPrs,
        volumePrs: req.body.volumePrs,
        echostructurePrs: req.body.echostructurePrs,
        contoursPrs: req.body.contoursPrs,
        consultation : req.body.consultation
    });

    await NewProstate.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewProstate);

});

// Supprimer Prostate 

router.delete('/deleteProst/:ProstId', (req,res) => {
    const ID = req.params.ProstId;
    Prost.deleteOne({ _id : ID },(err, result) => {
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

// Modifier Prostate
router.put('/updateProst/:ProstId' , (req,res) => {

    const ID = req.params.ProstId;
    const UpdatedProst = {
        dimensionsPrs: req.body.dimensionsPrs,
        volumePrs: req.body.volumePrs,
        echostructurePrs: req.body.echostructurePrs,
        contoursPrs: req.body.contoursPrs,
    }
    Prost.updateOne( {_id : ID} , {$set : UpdatedProst} , (err, result)=>{
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