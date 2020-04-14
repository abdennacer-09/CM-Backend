const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Sec = require('../models/secretaire');
const Pat = require('../models/patient');
const Rdv = require('../models/rendezVous');
const Cons = require('../models/consultation');
//const Sec_Pat = require('../models/sec-pat'); 

router.get('/addPatient', (req, res) => {
    res.send('Add patients');
});

router.get('/countPat/:secId', async (req, res)=> {
    Pat.count({}, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.json(result)
        }
    })
});

router.get('/:secId', async (req, res)=> {
    const patients =  await Pat.find();
    //const patients =  await Pat.find().populate('secretaires')
    res.json(patients);
    console.log(patients);
});

router.get('/:secId/findPatient/:id', async(req,res)=>{
    const {id} = req.params;
    const patient = await Pat.findById(id);
    res.json(patient)
    console.log(patient);
})
//findOne({events: {$elemMatch: {title: 'test'}}})


router.post('/:secId/addPatient', async (req, res, next) => {
    
    const { secId } = req.params;

    const Newpatient = new Pat({
        nom : req.body.nom,
        cin : req.body.cin,
        prenom : req.body.prenom,
        sexe : req.body.sexe,
        tel: req.body.tel,
        mituelle : req.body.mituelle,
        adresse : req.body.adresse,
        profession : req.body.profession,
        age : req.body.age,
        sitFam : req.body.sitFam,
        dateNaissance : req.body.dateNaissance,
    });
    
    const sec = await Sec.findById(secId);
    Newpatient.secretaires = sec;
    await Newpatient.save();
    sec.patients.push(Newpatient);
    await sec.save();
    res.status(201).json(Newpatient);
    
});

// Modifier Patient
router.put('/:secId/updatePatient/:patId' , (req,res) => {

    const ID = req.params.patId;
    const UpdatedPatient = {
        nom: req.body.nom,
        cin: req.body.cin,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        profession: req.body.profession,
        sexe: req.body.sexe,
        tel: req.body.tel,
        mituelle: req.body.mituelle,
        age: req.body.age,
        sitFam: req.body.sitFam,
        dateNaissance: req.body.dateNaissance
    }


    Pat.updateOne( {_id : ID} , {$set : UpdatedPatient} , (err, result)=>{
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

// Supprimer Patient

router.delete('/:secId/deletePatient/:patId', (req,res,next) => {
    const ID = req.params.patId;
    Pat.deleteOne({ _id : ID },(err, result) => {
        if(err){
            console.log(err);
            res.status(500).json({
                error : next(err)
            });
            return;
        }
        console.log(result);
        res.status(500).json(result);
    })
});

router.delete('/:secId/deleteRdvPat/:patId',(req,res) => {
    const IDpat = req.params.patId;
    Rdv.deleteMany({ patient : IDpat },(err, result) => {
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

router.delete('/:secId/deleteConsPat/:patId',(req,res) => {
    const IDpat = req.params.patId;
    Cons.deleteMany({ patient : IDpat },(err, result) => {
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

/*router.post('/addPatient', (req, res) => {
    const patient = new Pat({
        nom : req.body.nom,
        cin : req.body.cin,
        adresse : req.body.adresse,
        profession : req.body.profession,
        tel : req.body.tel,
        age : req.body.age,
        sitFam :  req.body.sitFam,
    });

    patient.save((resualt, err) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });

    
});*/

module.exports = router;