const express = require('express');
const router = express.Router();
const Cat = require('../models/categorie');
const Cons = require('../models/consultation');

router.get('/', (req,res) => {
    const categories =   Cat.find();
    console.log(categories);
});

router.post('/addCategorie', async (req,res) => {

    const NewCategorie = new Cat({
        nom: req.body.nom,
    });

    await NewCategorie.save(( err, resualt) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(resualt);
    });
    res.status(201).json(NewCategorie);

});

// Modifier Categorie
router.put('/updateCategorie/:catId' , (req,res) => {

    const ID = req.params.catId;
    const UpdateCategorie = {
        nom: req.body.nom
    }
    Cat.updateOne( {_id : ID} , {$set : UpdateCategorie} , (err, result)=>{
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

// Supprimer Categorie

router.delete('/deleteCategorie/:catId', (req,res) => {
    const ID = req.params.catId;
    Cat.deleteOne({ _id : ID },(err, result) => {
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