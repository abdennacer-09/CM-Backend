const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cons = require('../models/consultation');
const Vess = require('../models/vessie ');

router.get('/', async (req, res)=> {
    const vessies =  await Vess.find();
    res.json(vessies);
    console.log(vessies);
});

router.get('/FilterVess', async (req, res)=> {
    const vessies =  await Vess.find().populate('consultation').populate('patient');
    res.json(vessies);
    console.log(vessies);
});

router.get('/FilterVess/:idPat', async (req, res)=> {
    const ID = req.params.idPat;
    const cons = await Cons.find({patient : ID});
    const vessies =  await Vess.find({consultation : cons });
    res.json(vessies);
    console.log(vessies);
});

//add  Vessie 
router.post('/addVessie', async (req,res) => {

    const NewVessie = new Vess({
        repletion: req.body.repletion,
        contenu: req.body.contenu,
        parois: req.body.parois,
        residuPostMictionnel: req.body.residuPostMictionnel,
        consultation : req.body.consultation
    });

    await NewVessie.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewVessie);

});

// Supprimer Vessie 

router.delete('/deleteVessie/:VessId', (req,res) => {
    const ID = req.params.VessId;
    Vess.deleteOne({ _id : ID },(err, result) => {
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

// Modifier Vessie
router.put('/updateVessie/:VessId' , (req,res) => {

    const ID = req.params.VessId;
    const UpdatedVessie = {
        repletion: req.body.repletion,
        contenu: req.body.contenu,
        parois: req.body.parois,
        residuPostMictionnel: req.body.residuPostMictionnel,
    }
    Vess.updateOne( {_id : ID} , {$set : UpdatedVessie} , (err, result)=>{
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