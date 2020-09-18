const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cons = require('../models/consultation');
const ReinGch = require('../models/reinGauche');

router.get('/', async (req, res)=> {
    const reinsGauche =  await ReinGch.find();
    res.json(reinsGauche);
    console.log(reinsGauche);
});

router.get('/FilterReinGch', async (req, res)=> {
    const reinsGauche =  await ReinGch.find().populate('consultation').populate('patient');
    res.json(reinsGauche);
    console.log(reinsGauche);
});

router.get('/FilterReinGch/:idPat', async (req, res)=> {
    const ID = req.params.idPat;
    const cons = await Cons.find({patient : ID});
    const reinsGauche =  await ReinGch.find({consultation : cons });
    res.json(reinsGauche);
    console.log(reinsGauche);
});

//add Rein gauche
router.post('/addReinGch', async (req,res) => {

    const NewReinGch = new ReinGch({

        dimensionsGch: req.body.dimensionsGch,
        differenciationGch: req.body.differenciationGch,
        dilatationGch: req.body.dilatationGch,
        consultation : req.body.consultation
    });

    await NewReinGch.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewReinGch);

});

// Supprimer Rein gauche 

router.delete('/deleteReinGch/:ReinGchId', (req,res) => {
    const ID = req.params.ReinGchId;
    ReinGch.deleteOne({ _id : ID },(err, result) => {
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

// Modifier Rein gauche
router.put('/updateReinGch/:ReinGchId' , (req,res) => {

    const ID = req.params.ReinGchId;
    const UpdatedReinGch = {
        dimensionsGch: req.body.dimensionsGch,
        differenciationGch: req.body.differenciationGch,
        dilatationGch: req.body.dilatationGch,
    }
    ReinGch.updateOne( {_id : ID} , {$set : UpdatedReinGch} , (err, result)=>{
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