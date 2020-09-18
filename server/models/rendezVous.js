const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RdvSchema = new Schema ({
    date :{
        type:Date
    },
    type :{
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

module.exports = mongoose.model('RendezVous', RdvSchema);