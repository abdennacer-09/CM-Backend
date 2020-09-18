const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Ordns = require('../models/ordonnance');
const Cons = require('../models/consultation');

router.get('/', async (req, res)=> {
    const ordonnances =  await Ordns.find();
    res.json(ordonnances);
    console.log(ordonnances);
});

router.get('/FilterOrdns', async (req, res)=> {
    const ordonnances =  await Ordns.find().populate('consultation').populate('patient');
    res.json(ordonnances);
    console.log(ordonnances);
}); 

router.get('/FilterOrdns/:idPat', async (req, res)=> {
    const ID = req.params.idPat;
    const cons = await Cons.find({patient : ID});
    const ordonnances =  await Ordns.find({consultation : cons });
    res.json(ordonnances);
    console.log(ordonnances);
});

router.get('/countOrdns', async (req, res)=> {
    Ordns.count({}, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.json(result)
        }
    })
});

router.post('/addOrdns', async (req,res) => {

    const NewOrdonnace = new Ordns({
        quantite: req.body.quantite,
        prise: req.body.prise,
        periode: req.body.periode,
        nbrParJour: req.body.nbrParJour,
        quand: req.body.quand,
        remarque: req.body.remarque,
        medicament: req.body.medicament,
        consultation: req.body.consultation
    });

    await NewOrdonnace.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewOrdonnace);

});

// Modifier Ordonnance
router.put('/updateOrdns/:ordnsId' , (req,res) => {

    const ID = req.params.ordnsId;
    const UpdatedOrdonnance = {
        quantite: req.body.quantite,
        prise: req.body.prise,
        periode: req.body.periode,
        nbrParJour: req.body.nbrParJour,
        quand: req.body.quand,
        remarque: req.body.remarque,
        medicament: req.body.medicament,
    }
    Ordns.updateOne( {_id : ID} , {$set : UpdatedOrdonnance} , (err, result)=>{
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

// Supprimer Ordonnance

router.delete('/deleteOrdns/:ordnsId', (req,res) => {
    const ID = req.params.ordnsId;
    Ordns.deleteOne({ _id : ID },(err, result) => {
        if(err){
            console.log(err);
            res.status(500).json({
                error : err
            });
            return;
        }
        console.log(result);
        res.status(500).json(Ordns);
    })
});

module.exports = router;