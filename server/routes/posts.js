
const express = require('express');
const mongoose = require('mongoose');
const Sec = require('../models/secretaire');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../config/keys').secret;
const router = express.Router();
const Pat = require('../models/patient');
const Cons = require('../models/consultation');
//const Sec_Pat = require('../models/sec-pat'); 

//const { check , validationResult } = require('express-validator');

router.get('/signup', (req, res) => {
    res.send('signup');
});

router.get('/users', async (req, res)=> {
    const users =  await Sec.find();
    //const patients =  await Pat.find().populate('secretaires')
    res.json(users);
    console.log(users);
});

/*router.post('/signup', async (req, res, next) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let sec = await Sec.findOne({ email: req.body.email });
    if(sec) return res.status(400).send('Secretaire already registred.');

    sec = new Sec({
        nom : req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: req.body.password
    });

    await sec.save();

    res.send(sec);

});*/

router.post('/signup', (req, res) => {
    let {nom, cin, email,isAdmin , tel, adresse, password, confirm_password} = req.body
    if(password !== confirm_password){
        return res.status(400).json({
            msg: "Le mot de passe ne correspond pas."
        })
    }

    Sec.findOne({
        email: email
    }).exec().then(sec => {
        if(sec){
            return res.status(400).json({
                msg: "L'adresse e-mail est déjà utilisée."
            });
        }
    });

    // The data is valid new we can register the user
    let newSec = new Sec({
        nom,
        cin, 
        email, 
        password,
        isAdmin,
        tel,
        adresse
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newSec.password, salt, (err, hash) => {
            if(err) res.send(err);
            newSec.password = hash;
            newSec.save().then(sec => {
                return res.status(201).json({
                    success: true,
                    msg: "Le secrétaire est maintenant inscrit"
                });
            });
        } );
    });
});

// Modifier User
router.put('/updateUser/:userId' , (req,res) => {

    const ID = req.params.userId;
    const UpdatedUser = {
        nom: req.body.nom,
        cin: req.body.cin,
        email: req.body.email,
        adresse: req.body.adresse,
        tel: req.body.tel,
        isAdmin: req.body.isAdmin
    }

    /*Sec.findOne({
        email: req.body.email
    }).exec().then(sec => {
        if(sec){
            return res.status(400).json({
                msg: "Email is already registred."
            });
        }
    });*/

    Sec.updateOne( {_id : ID} , {$set : UpdatedUser} , (err, result)=>{
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

// Modifier Password
router.put('/updatePass/:userId' , (req,res) => {

    const ID = req.params.userId;
    const UpdatedPass = {
        password: req.body.password,
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(UpdatedPass.password, salt, (err, hash) => {
            if(err) res.send(err);
            UpdatedPass.password = hash;
            Sec.updateOne( {_id : ID} , {$set : UpdatedPass} , (err, result)=>{
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
        } );
    });

});

//Supprimer User
router.delete('/deleteUser/:userId', (req,res,next) => {
    const ID = req.params.userId;
    Sec.deleteOne({ _id : ID },(err, result) => {
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

router.post('/login', (req,res) => {
    Sec.findOne({ email: req.body.email }).then(sec => {
        if(!sec){
            return res.status(404).json({
                msg: "L'e-mail est introuvable",
                success: false
            });
        }
        // if there is secretaire we are now going to compare the password
        bcrypt.compare(req.body.password, sec.password).then(isMatch => {
            if(isMatch){
                //password correct 
                const payload = {
                    _id: sec._id,
                    nom: sec.nom,
                    cin: sec.cin,
                    email: sec.email,
                    isAdmin: sec.isAdmin,
                    tel: sec.tel,
                    adresse: sec.adresse
                }
                jwt.sign(payload, key,{
                    expiresIn: 604800
                },(err, token) => {
                    res.status(200).json({
                        success: true,
                        user: sec,
                        token: `Bearer ${token}`,
                        msg: "vous êtes maintenant connecté "
                    });
                });
            }else{
                return res.status(404).json({
                    msg: "Le mot de passe n'est pas correct",
                    success: false
                });
            }
        })
    });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        user: req.user
    });
});


module.exports = router;