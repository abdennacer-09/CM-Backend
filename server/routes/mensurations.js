const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cons = require('../models/consultation');
const Mens = require('../models/mensuration');

router.get('/', async (req, res)=> {
    const mensurations =  await Mens.find();
    res.json(mensurations);
    console.log(mensurations);
});

router.get('/FilterMens', async (req, res)=> {
    const mensurations =  await Mens.find().populate('consultation').populate('patient');
    res.json(mensurations);
    console.log(mensurations);
});

router.get('/FilterMens/:idPat', async (req, res)=> {
    const ID = req.params.idPat;
    const cons = await Cons.find({patient : ID});
    const mensurations =  await Mens.find({consultation : cons });
    res.json(mensurations);
    console.log(mensurations);
});

//add Mensuration
router.post('/addMensuration', async (req,res) => {

    const NewMensur = new Mens({
        lcc: req.body.lcc,
        bip: req.body.bip,
        fl: req.body.fl,
        dat: req.body.dat,
        hc: req.body.hc,
        autresMens: req.body.autresMens,
        consultation : req.body.consultation
    });

    await NewMensur.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewMensur);

});

// Supprimer Mensuration

router.delete('/deleteMensuration/:MensId', (req,res) => {
    const ID = req.params.MensId;
    Mens.deleteOne({ _id : ID },(err, result) => {
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

// Modifier Mensuration
router.put('/updateMensuration/:MensId' , (req,res) => {

    const ID = req.params.MensId;
    const UpdatedMens = {
        lcc: req.body.lcc,
        bip: req.body.bip,
        fl: req.body.fl,
        dat: req.body.dat,
        hc: req.body.hc,
        autresMens: req.body.autresMens,
    }
    Mens.updateOne( {_id : ID} , {$set : UpdatedMens} , (err, result)=>{
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