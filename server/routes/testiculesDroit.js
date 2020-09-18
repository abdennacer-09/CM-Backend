const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cons = require('../models/consultation');
const TesticDr = require('../models/testiculeDroit');

router.get('/', async (req, res)=> {
    const testiculesDroit =  await TesticDr.find();
    res.json(testiculesDroit);
    console.log(testiculesDroit);
});

router.get('/FilterTesticDr', async (req, res)=> {
    const testiculesDroit =  await TesticDr.find().populate('consultation').populate('patient');
    res.json(testiculesDroit);
    console.log(testiculesDroit);
});

router.get('/FilterTesticDr/:idPat', async (req, res)=> {
    const ID = req.params.idPat;
    const cons = await Cons.find({patient : ID});
    const testiculesDroit =  await TesticDr.find({consultation : cons });
    res.json(testiculesDroit);
    console.log(testiculesDroit);
});

//add Tsticule Droit
router.post('/addTesticDr', async (req,res) => {

    const NewTesticDr = new TesticDr({
        mmDr: req.body.mmDr,
        contoursDr: req.body.contoursDr,
        echostructureDr: req.body.echostructureDr,
        AvEcDpCDr: req.body.AvEcDpCDr,
        consultation : req.body.consultation
    });

    await NewTesticDr.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewTesticDr);

});

// Supprimer Tsticule Droit 

router.delete('/deleteTesticDr/:TesticDrId', (req,res) => {
    const ID = req.params.TesticDrId;
    TesticDr.deleteOne({ _id : ID },(err, result) => {
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

// Modifier Tsticule Droit 
router.put('/updateTesticDr/:TesticDrId' , (req,res) => {

    const ID = req.params.TesticDrId;
    const UpdatedTesticDr = {
        mmDr: req.body.mmDr,
        contoursDr: req.body.contoursDr,
        echostructureDr: req.body.echostructureDr,
        AvEcDpCDr: req.body.AvEcDpCDr,
    }
    TesticDr.updateOne( {_id : ID} , {$set : UpdatedTesticDr} , (err, result)=>{
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