const express = require('express');
const mongoose = require('mongoose');
const Sec = require('../models/secretaire');
const router = express.Router();
const Pat = require('../models/patient');
const Rdv = require('../models/rendezVous');


router.get('/', async (req, res)=> {
    const rdvs =  await Rdv.find().populate('patient');
    //const patients =  await Pat.find().populate('secretaires')
    res.json(rdvs)
    console.log(rdvs);
});


router.post('/:secId/addRdv', async (req,res) => {
    const { secId } = req.params;

    const NewRdvs = new Rdv({
        date: req.body.date,
        type: req.body.type,
        patient: req.body.patient
    });

    const sec = await Sec.findById(secId);
    NewRdvs.secretaire = sec;

    await NewRdvs.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        res.status(201).json(resualt);
        console.log(resualt);
    });
    

});

//Modifier le Rendrez vous

router.put('/:secId/updateRdv/:rdvId' , (req,res) => {

    const ID = req.params.rdvId;
    const UpdatedRDV = {
        date: req.body.date,
        patient: req.body.patient,
    }


    Rdv.updateOne( {_id : ID} , {$set : UpdatedRDV} , (err, result)=>{
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


// Supprimer Rendez vous

router.delete('/:secId/deleteRdv/:rdvId', (req,res) => {
    const ID = req.params.rdvId;
    Rdv.deleteOne({ _id : ID },(err, result) => {
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