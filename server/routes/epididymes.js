const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cons = require('../models/consultation');
const Epidid = require('../models/epididyme');

router.get('/', async (req, res)=> {
    const epididymes =  await Epidid.find();
    res.json(epididymes);
    console.log(epididymes);
});

router.get('/FilterEpid', async (req, res)=> {
    const epididymes =  await Epidid.find().populate('consultation').populate('patient');
    res.json(epididymes);
    console.log(epididymes);
});

router.get('/FilterEpid/:idPat', async (req, res)=> {
    const ID = req.params.idPat;
    const cons = await Cons.find({patient : ID});
    const epididymes =  await Epidid.find({consultation : cons });
    res.json(epididymes);
    console.log(epididymes);
});

//add epididymes
router.post('/addEpidid', async (req,res) => {

    const NewEpidid = new Epidid({
        epidDr: req.body.epidDr,
        epidGch: req.body.epidGch,
        consultation : req.body.consultation
    });

    await NewEpidid.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewEpidid);

});

// Supprimer epididymes

router.delete('/deleteEpidid/:EpId', (req,res) => {
    const ID = req.params.EpId;
    Epidid.deleteOne({ _id : ID },(err, result) => {
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

// Modifier epididymes 
router.put('/updateEpidid/:EpId' , (req,res) => {

    const ID = req.params.EpId;
    const UpdatedEpidid = {
        epidDr: req.body.epidDr,
        epidGch: req.body.epidGch,
    }
    Epidid.updateOne( {_id : ID} , {$set : UpdatedEpidid} , (err, result)=>{
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