const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');


const app = express();
//mongodb://localhost/CabinetMedical
//mongodb+srv://storeino:storeino123@cabinetmedical-odyfi.mongodb.net/test?retryWrites=true&w=majority
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

app.get('/test', (req,res)=> {
    res.send(' Hello world ');
});

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
const foie = require('./routes/foie');
const vesiculeBiliaire = require('./routes/vesiculeBiliaire'); 
const voiesBiliaires = require('./routes/voiesBiliaires');
const pancrease = require('./routes/pancrease');
const rates = require('./routes/rates');
const reinsDroit = require('./routes/reinsDroit');
const reinsGauche = require('./routes/reinsGauche');
const vessies = require('./routes/vessies');
const prostates = require('./routes/prostates');
const testiculesDroit = require('./routes/testiculesDroit');
const testiculesGch = require('./routes/testiculesGch');
const sacGests = require('./routes/sacGests');
const embryons = require('./routes/embryons');
const mensurations = require('./routes/mensurations');  
const epididymes = require('./routes/epididymes');
const hydroceles  = require('./routes/hydroceles');  
const varicoceles  = require('./routes/varicoceles');
const autresRadio = require('./routes/autresRadio');

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
app.use('/foie', foie);
app.use('/vesiculeBiliaire', vesiculeBiliaire);
app.use('/voiesBiliaires', voiesBiliaires);
app.use('/pancrease', pancrease);
app.use('/rates', rates);
app.use('/reinsDroit', reinsDroit);
app.use('/reinsGauche', reinsGauche);
app.use('/vessies', vessies);
app.use('/prostates', prostates);
app.use('/testiculesDroit', testiculesDroit);
app.use('/testiculesGch', testiculesGch);
app.use('/sacGests', sacGests);
app.use('/embryons', embryons);
app.use('/mensurations', mensurations);
app.use('/epididymes', epididymes);
app.use('/hydroceles', hydroceles);
app.use('/varicoceles', varicoceles);
app.use('/autresRadio', autresRadio);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));


