const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cons = require('../models/consultation');
const Panc = require('../models/pancreas ');

router.get('/', async (req, res)=> {
    const pancreas =  await Panc.find();
    res.json(pancreas);
    console.log(pancreas);
});

router.get('/FilterPanc', async (req, res)=> {
    const pancreas =  await Panc.find().populate('consultation').populate('patient');
    res.json(pancreas);
    console.log(pancreas);
});

router.get('/FilterPanc/:idPat', async (req, res)=> {
    const ID = req.params.idPat;
    const cons = await Cons.find({patient : ID});
    const pancreas =  await Panc.find({consultation : cons });
    res.json(pancreas);
    console.log(pancreas);
});

//add Pancreas
router.post('/addPanc', async (req,res) => {

    const NewPanc = new Panc({
        pancreas: req.body.pancreas,
        rmqPancreas: req.body.rmqPancreas,
        consultation : req.body.consultation
    });

    await NewPanc.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewPanc);

});

// Supprimer Pancreas 

router.delete('/deletePanc/:PancId', (req,res) => {
    const ID = req.params.PancId;
    Panc.deleteOne({ _id : ID },(err, result) => {
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

// Modifier Pancreas
router.put('/updatePanc/:PancId' , (req,res) => {

    const ID = req.params.PancId;
    const UpdatedPanc = {
        pancreas: req.body.pancreas,
        rmqPancreas: req.body.rmqPancreas,
    }
    Panc.updateOne( {_id : ID} , {$set : UpdatedPanc} , (err, result)=>{
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