const express = require('express');
const mongoose = require('mongoose');
const Cons = require('../models/consultation');
const router = express.Router();
const Medic = require('../models/Medicament');

router.get('/', async (req, res)=> {
    const medicaments =  await Medic.find();
    res.status(201).json(medicaments);
    console.log(medicaments);
});

router.post('/addMedic', async (req,res) => {

    const NewMedicament = new Medic({
        nom: req.body.nom,
        posologie: req.body.posologie
    });


    await NewMedicament.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewMedicament);

});

// Modifier Medicament
router.put('/updateMedic/:medicId' , (req,res) => {

    const ID = req.params.medicId;
    const UpdatedMedicament = {
        nom: req.body.nom,
        posologie: req.body.posologie
    }
    Medic.updateOne( {_id : ID} , {$set : UpdatedMedicament} , (err, result)=>{
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

// Supprimer Medicament

router.delete('/deleteMedic/:medicId', (req,res) => {
    const ID = req.params.medicId;
    Medic.deleteOne({ _id : ID },(err, result) => {
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

module.exports = router;