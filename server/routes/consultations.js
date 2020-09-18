const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Sec = require('../models/secretaire');
const Pat = require('../models/patient');
const Cat = require('../models/categorie');
const Cons = require('../models/consultation');
const Ordns = require('../models/ordonnance');


router.get('/', async (req, res)=> {
    const consultations =  await Cons.find().populate('patient');
    res.json(consultations);
    console.log(consultations);
});

router.get('/countCons', async (req, res)=> {
    Cons.count({}, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.json(result)
        }
    })
});

router.get('/consAjourdui', async (req, res)=> {
    // var nowDate = new Date();
     //var dateWitTm = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate(); 
    const consultations =  await Cons.find({'date': {"$lte": new Date()}}).populate('patient');
     //const patients =  await Pat.find().populate('secretaires')
    res.json(consultations)
    console.log(consultations); 
});

router.post('/:secId/addCons', async (req,res) => {
    const { secId } = req.params;

    const NewConsultation = new Cons({
        date: req.body.date,
        patient: req.body.patient,
    });

    const sec = await Sec.findById(secId);
    NewConsultation.secretaire = sec;

    await NewConsultation.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewConsultation);

});

// Modifier Consultation
router.put('/updateConsultation/:consId' , (req,res) => {

    const ID = req.params.consId;
    const UpdatedConsultation = {
        date: req.body.date,
        patient: req.body.patient,
        
    }
    Cons.updateOne( {_id : ID} , {$set : UpdatedConsultation} , (err, result)=>{
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

// Supprimer Consultation

router.delete('/deleteConsultation/:consId', (req,res) => {
    const ID = req.params.consId;
    Cons.deleteOne({ _id : ID },(err, result) => {
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