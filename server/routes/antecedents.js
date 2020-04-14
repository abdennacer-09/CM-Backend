const express = require('express');
const router = express.Router();
const Cat = require('../models/categorie');
const Cons = require('../models/consultation');
const Antc = require('../models/antecedent');
const Fam = require('../models/famil');
const Medic = require('../models/medicaux');
const Chirg = require('../models/chirurgicaux');
const Obst = require('../models/obstetricaux');

router.get('/', async (req, res)=> {
    const antecedents =  await Antc.find();
    res.json(antecedents);
    console.log(antecedents);
});

router.get('/famil', async (req, res)=> {
    const familias =  await Fam.find();
    res.json(familias);
    console.log(familias);
});

router.get('/medic', async (req, res)=> {
    const medicaux =  await Medic.find();
    res.json(medicaux);
    console.log(medicaux);
});

router.get('/chirg', async (req, res)=> {
    const chirurgicaux =  await Chirg.find();
    res.json(chirurgicaux);
    console.log(chirurgicaux);
});

router.get('/obst', async (req, res)=> {
    const obstetricaux =  await Obst.find();
    res.json(obstetricaux);
    console.log(obstetricaux);
});



// Ajouter antecedent
router.post('/addAntec', async (req,res) => {

    const NewAntecedent = new Antc({
        midicaux: req.body.midicaux,
        rmqMdc: req.body.rmqMdc,
        familiaux: req.body.familiaux,
        rmqFam : req.body.rmqFam,
        chirurgicaux : req.body.chirurgicaux,
        rmqChirg : req.body.rmqChirg,
        Obstétricaux : req.body.Obstétricaux,
        rmqObst : req.body.rmqObst,
        consultation : req.body.consultation
    });

    await NewAntecedent.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewAntecedent);

});

//Ajouter Familiaux
router.post('/addFamiliaux', async (req, res) =>  {
    const NewFamiliaux = new Fam({
        familiaux: req.body.familiaux,
        rmqFam : req.body.rmqFam,
        consultation : req.body.consultation
    });

    await NewFamiliaux.save((err, result) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(result);
    });
    res.status(201).json(NewFamiliaux);
});

// Supprimer Familiaux

router.delete('/deleteFam/:FamId', (req,res) => {
    const ID = req.params.FamId;
    Fam.deleteOne({ _id : ID },(err, result) => {
        if(err){
            console.log(err);
            res.status(500).json({
                error : err
            });
            return;
        }
        console.log(result);
        res.status(500).json(Fam);
    })
});

// Modifier Familiaux
router.put('/updateFam/:famId' , (req,res) => {

    const ID = req.params.famId;
    const UpdatedFamiliaux = {
        familiaux: req.body.familiaux,
        rmqFam : req.body.rmqFam,
    }
    Fam.updateOne( {_id : ID} , {$set : UpdatedFamiliaux} , (err, resualt)=>{
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
            return;
        }
        console.log(resualt);
        res.status(500).json(Fam);
    });

});


//Ajouter Midicaux
router.post('/addMidicaux', async (req, res) =>  {
    const NewMidicaux = new Medic({
        midicaux: req.body.midicaux,
        rmqMdc : req.body.rmqMdc,
        consultation : req.body.consultation
    });

    await NewMidicaux.save((err, result) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(result);
    });
    res.status(201).json(NewMidicaux);
});

// Supprimer Medicaux

router.delete('/deleteMdc/:MdcId', (req,res) => {
    const ID = req.params.MdcId;
    Medic.deleteOne({ _id : ID },(err, result) => {
        if(err){
            console.log(err);
            res.status(500).json({
                error : err
            });
            return;
        }
        console.log(result);
        res.status(500).json(Medic);
    })
});

// Modifier Medicaux
router.put('/updateMedic/:medicId' , (req,res) => {

    const ID = req.params.medicId;
    const UpdatedMedicaux = {
        medicaux: req.body.medicaux,
        rmqMdc : req.body.rmqMdc,
    }
    Medic.updateOne( {_id : ID} , {$set : UpdatedMedicaux} , (err, resualt)=>{
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
            return;
        }
        console.log(resualt);
        res.status(500).json(Medic);
    });

});

// Ajouter Chirurgicaux
router.post('/addChirurgicaux', async (req, res) =>  {
    const NewChirurgicaux = new Chirg({
        chirurgicaux: req.body.chirurgicaux,
        rmqChirg : req.body.rmqChirg,
        consultation : req.body.consultation
    });

    await NewChirurgicaux.save((err, result) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(result);
    });
    res.status(201).json(NewChirurgicaux);
});

// Supprimer Chirurgicaux

router.delete('/deleteChirg/:ChirgId', (req,res) => {
    const ID = req.params.ChirgId;
    Chirg.deleteOne({ _id : ID },(err, result) => {
        if(err){
            console.log(err);
            res.status(500).json({
                error : err
            });
            return;
        }
        console.log(result);
        res.status(500).json(Chirg);
    })
});


// Ajouter Obstétricaux
router.post('/addObstetricaux', async (req, res) =>  {
    const NewObstetricaux = new Obst({
        Obstetricaux: req.body.Obstetricaux,
        rmqObst : req.body.rmqObst,
        consultation : req.body.consultation
    });

    await NewObstetricaux.save((err, result) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(result);
        res.status(201).json(NewObstetricaux);
    });
});



// Modifier Antecedent
router.put('/updateAntec/:antecId' , (req,res) => {

    const ID = req.params.antecId;
    const UpdatedAntecedent = {
        midicaux: req.body.midicaux,
        rmqMdc: req.body.rmqMdc,
        familiaux: req.body.familiaux,
        rmqFam : req.body.rmqFam,
        chirurgicaux : req.body.chirurgicaux,
        rmqChirg : req.body.rmqChirg,
        Obstétricaux : req.body.Obstétricaux,
        rmqObst : req.body.rmqObst,
        consultation : req.body.consultation
    }
    Antc.updateOne( {_id : ID} , {$set : UpdatedAntecedent} , (err, resualt)=>{
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
            return;
        }
        console.log(resualt);
        res.status(500).json(resualt);
    });

});

// Supprimer antecedent

router.delete('/deleteAntec/:antecId', (req,res) => {
    const ID = req.params.antecId;
    Antc.deleteOne({ _id : ID },(err, result) => {
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