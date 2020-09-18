const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cons = require('../models/consultation');
const SacGest = require('../models/sacGest');

router.get('/', async (req, res)=> {
    const sacGests =  await SacGest.find();
    res.json(sacGests);
    console.log(sacGests); 
});

router.get('/FilterSacGest', async (req, res)=> {
    const sacGests =  await SacGest.find().populate('consultation').populate('patient');
    res.json(sacGests);
    console.log(sacGests);
});

router.get('/FilterSacGest/:idPat', async (req, res)=> {
    const ID = req.params.idPat;
    const cons = await Cons.find({patient : ID});
    const sacGests =  await SacGest.find({consultation : cons });
    res.json(sacGests);
    console.log(sacGests);
});

//add sac gest
router.post('/addSacGest', async (req,res) => {

    const NewSacGest = new SacGest({
        nombre: req.body.nombre,
        position: req.body.position,
        forme: req.body.forme, 
        diametre: req.body.diametre,
        consultation : req.body.consultation
    });

    await NewSacGest.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewSacGest);

});

// Supprimer sac gest

router.delete('/deleteSacGest/:SacGestId', (req,res) => {
    const ID = req.params.SacGestId;
    SacGest.deleteOne({ _id : ID },(err, result) => {
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

// Modifier sac gest
router.put('/updateSacGest/:SacGestId' , (req,res) => {

    const ID = req.params.SacGestId;
    const UpdatedSacGest = {
        nombre: req.body.nombre,
        position: req.body.position,
        forme: req.body.forme,
        diametre: req.body.diametre,
    }
    SacGest.updateOne( {_id : ID} , {$set : UpdatedSacGest} , (err, result)=>{
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