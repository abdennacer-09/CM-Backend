const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConsSchema = new Schema ({
    date :{
        type:Date
    },
    type :{
        type: String
    },
    categorie:{
        type: Schema.Types.ObjectId,
        ref: 'Categorie'
    },
    status:{
        type: String
    },
    patient:{
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    },
    secretaire:{
        type: Schema.Types.ObjectId,
        ref: 'secretaire'
    },
    
});

module.exports = mongoose.model('Consultation', ConsSchema);