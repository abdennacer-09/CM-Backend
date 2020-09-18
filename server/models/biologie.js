const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamBioSchema = new Schema ({
    NfsPq :{
        type: String
    },
    TSHus :{
        type: String
    },
    T3 :{
        type: String
    },
    T4 :{
        type: String
    },
    Glycemie :{
        type: String
    },
    HBGA1c :{
        type: String
    },
    LDL :{
        type: String
    },
    HDL :{
        type: String
    },
    TG :{
        type: String
    },
    CT :{
        type: String
    },
    PSA :{
        type: String
    },
    TP :{
        type: String
    },
    TCK :{
        type: String
    },
    INR :{
        type: String
    },
    Groupage :{
        type: String
    },
    TPHA :{
        type: String
    },
    VDRL :{
        type: String
    },
    SerologieToxo :{
        type: String
    },
    SerologieRub :{
        type: String
    },
    AutresBio :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
    
});

module.exports = mongoose.model('Biologie', ExamBioSchema);