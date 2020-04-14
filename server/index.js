const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');


const app = express();

mongoose.connect('mongodb://localhost/CabinetMedical', { useNewUrlParser: true } ,(err) =>{
    if(err){
        console.log(err);
    }

    console.log('Connected to DataBase');
});

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
require('./config/passport')(passport);
/*app.get('/', (req,res)=> {
    res.send(' Hello world ');
});*/

const posts = require('./routes/posts');
const patients = require('./routes/patients');
const rdvs = require('./routes/rdvs');
const consultations = require('./routes/consultations');
const categories = require('./routes/categories');
const antecedents = require('./routes/antecedents');
const examensClinique = require('./routes/examensClinique');
const medicaments = require('./routes/medicaments');
const ordonnances = require('./routes/ordonnances');
const examensParaClin = require('./routes/examensParaClin');
const certificatsMedicaux = require('./routes/certificatsMedicaux');
const interogatoires = require('./routes/interogatoires');

app.use('/posts', posts);
app.use('/patients', patients);
app.use('/rdvs', rdvs);
app.use('/consultations', consultations);
app.use('/categories', categories);
app.use('/antecedents', antecedents);
app.use('/examensClinique', examensClinique);
app.use('/medicaments', medicaments);
app.use('/ordonnances', ordonnances);
app.use('/examensParaClin', examensParaClin);
app.use('/certificatsMedicaux', certificatsMedicaux);
app.use('/interogatoires', interogatoires);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));


