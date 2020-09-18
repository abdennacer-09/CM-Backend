const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProstateSchema = new Schema ({
    dimensionsPrs :{
        type: String
    },
    volumePrs :{
        type: String
    },
    echostructurePrs :{
        type: String
    },
    contoursPrs :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }

    
});

module.exports = mongoose.model('Prostate', ProstateSchema);