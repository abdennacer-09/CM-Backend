const express = require('express');
const router = express.Router();
const Cat = require('../models/categorie');
const Cons = require('../models/consultation');
const Antc = require('../models/antecedent');
const Interog = require('../models/interogatoire');


router.get('/', async (req, res)=> {
    const interogatoires =  await Interog.find();
    res.json(interogatoires);
    console.log(interogatoires);
});


// Ajouter Interogatoire
router.post('/addInterog', async (req,res) => {

    const NewInterogatoire = new Interog({
        motif: req.body.motif,
        rmqMotif: req.body.rmqMotif,
        patient : req.body.patient
    });

    await NewInterogatoire.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewInterogatoire);

});

// Modifier Interogatoire
router.put('/updateInterog/:interogId' , (req,res) => {

    const ID = req.params.interogId;
    const UpdatedInterogatoire = {
        motif: req.body.motif,
        rmqMotif: req.body.rmqMotif,
    }
    Interog.updateOne( {_id : ID} , {$set : UpdatedInterogatoire} , (err, resualt)=>{
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
            return;
        }
        console.log(resualt);
        res.status(500).json(Interog);
    });

});

// Supprimer Interogatoire

router.delete('/deleteInterog/:interogId', (req,res) => {
    const ID = req.params.interogId;
    Interog.deleteOne({ _id : ID },(err, result) => {
        if(err){
            console.log(err);
            res.status(500).json({
                error : err
            });
            return;
        }
        console.log(result);
        res.status(500).json(Interog);
    })
});

module.exports = router;