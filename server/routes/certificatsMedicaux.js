const express = require('express');
const mongoose = require('mongoose');
const Sec = require('../models/secretaire');
const router = express.Router();
const Pat = require('../models/patient');
const Rdv = require('../models/rendezVous');
const CrtMdc = require('../models/certificat_medical');


router.get('/', async (req, res)=> {
    const CrtMdc =  await CrtMdc.find().populate('secretaire');
    //const patients =  await Pat.find().populate('secretaires')
    res.json(CrtMdc)
    console.log(CrtMdc);
});

router.get('/countCertMdc', async (req, res)=> {
    CrtMdc.count({}, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.json(result)
        }
    })
});


router.post('/:secId/addCertMdc', async (req,res) => {
    const { secId } = req.params;

    const NewCertMdc = new CrtMdc({
        dateDebut: req.body.dateDebut,
        dateFin: req.body.dateFin,
        duree: req.body.duree,
        consultation : req.body.consultation

    });

    const sec = await Sec.findById(secId);
    NewCertMdc.docteur = sec;

    await NewCertMdc.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        res.status(201).json(resualt);
        console.log(resualt);
    });
    

});

//Modifier Certificat Medical

router.put('/:secId/updateCertMdc/:certMdcId' , (req,res) => {

    const ID = req.params.certMdcId;
    const UpdatedCertMdc = {
        dateDebut: req.body.dateDebut,
        dateFin: req.body.dateFin,
        duree: req.body.duree,
        consultation : req.body.consultation
    }


    CrtMdc.updateOne( {_id : ID} , {$set : UpdatedCertMdc} , (err, result)=>{
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
            return;
        }
        console.log(result);
        res.status(500).json(UpdatedCertMdc);
    });

});


// Supprimer Certificat Medical

router.delete('/:secId/deleteCertMdc/:certMdcId', (req,res) => {
    const ID = req.params.certMdcId;
    CrtMdc.deleteOne({ _id : ID },(err, result) => {
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