const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cons = require('../models/consultation');
const Varic = require('../models/varicocele');

router.get('/', async (req, res)=> {
    const varicoceles =  await Varic.find();
    res.json(varicoceles);
    console.log(varicoceles);
});

router.get('/FilterVaric', async (req, res)=> {
    const varicoceles =  await Varic.find().populate('consultation').populate('patient');
    res.json(varicoceles);
    console.log(varicoceles);
});

router.get('/FilterVaric/:idPat', async (req, res)=> {
    const ID = req.params.idPat;
    const cons = await Cons.find({patient : ID});
    const varicoceles =  await Varic.find({consultation : cons });
    res.json(varicoceles);
    console.log(varicoceles);
});

//add varicocele
router.post('/addVaric', async (req,res) => {

    const NewVaric = new Varic({
        varicDr: req.body.varicDr,
        varicGch: req.body.varicGch,
        consultation : req.body.consultation
    });

    await NewVaric.save((err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewVaric);

});

// Supprimer varicocele

router.delete('/deleteVaric/:VaricId', (req,res) => {
    const ID = req.params.VaricId;
    Varic.deleteOne({ _id : ID },(err, result) => {
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

// Modifier varicocele 
router.put('/updateVaric/:VaricId' , (req,res) => {

    const ID = req.params.VaricId;
    const UpdatedVaric = {
        varicDr: req.body.varicDr,
        varicGch: req.body.varicGch,
    }
    Varic.updateOne( {_id : ID} , {$set : UpdatedVaric} , (err, result)=>{
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