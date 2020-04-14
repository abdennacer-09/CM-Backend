const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CertificatMedicSchema = new Schema ({
    dateDebut :{
        type: Date
    },
    dateFin :{
        type: Date
    },
    duree:{
        type: Number
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    },
    docteur : {
        type: Schema.Types.ObjectId,
        ref: 'secretaire'
    }
    
});

module.exports = mongoose.model('CertificatMedical', CertificatMedicSchema);