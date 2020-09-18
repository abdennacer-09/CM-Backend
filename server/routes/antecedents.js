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

router.get('/famil/:idPat', async(req, res) => {
    const ID = req.params.idPat;
    const fams = await Fam.find({patient : ID});
    res.json(fams);
    console.log(fams);
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
        patient : req.body.patient
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
        hta: req.body.hta,
        diabete : req.body.diabete,
        allergie : req.body.allergie,
        autresMdc : req.body.autresMdc,
        patient : req.body.patient
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
        hta: req.body.hta,
        diabete : req.body.diabete,
        allergie : req.body.allergie,
        autresMdc : req.body.autresMdc
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
        patient : req.body.patient
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

// Modifier Chirurgicaux
router.put('/updateChirg/:chirgId' , (req,res) => {

    const ID = req.params.chirgId;
    const UpdatedChirurgicaux = {
        chirurgicaux: req.body.chirurgicaux,
        rmqChirg : req.body.rmqChirg,
    }
        Chirg.updateOne( {_id : ID} , {$set : UpdatedChirurgicaux} , (err, resualt)=>{
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
            return;
        }
        console.log(resualt);
        res.status(500).json(Chirg);
    });

});


// Ajouter Obstétricaux
router.post('/addObstetricaux', async (req, res) =>  {
    const NewObstetricaux = new Obst({
        Obstetricaux: req.body.Obstetricaux,
        rmqObst : req.body.rmqObst,
        patient : req.body.patient
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

// Supprimer Obstétricaux

router.delete('/deleteObst/:ObstId', (req,res) => {
    const ID = req.params.ObstId;
    Obst.deleteOne({ _id : ID },(err, result) => {
        if(err){
            console.log(err);
            res.status(500).json({
                error : err
            });
            return;
        }
        console.log(result);
        res.status(500).json(Obst);
    })
});

// Modifier Obstétricaux
router.put('/updateObst/:obstId' , (req,res) => {

    const ID = req.params.obstId;
    const UpdatedObstétricaux = {
        Obstetricaux: req.body.Obstetricaux,
        rmqObst : req.body.rmqObst,
    }
        Obst.updateOne( {_id : ID} , {$set : UpdatedObstétricaux} , (err, resualt)=>{
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
            return;
        }
        console.log(resualt);
        res.status(500).json(Obst);
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