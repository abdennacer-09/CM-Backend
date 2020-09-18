const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoiBiliaireSchema = new Schema ({
    intrahEpatique :{
        type: String
    },
    extrahepatique  :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
    
});

module.exports = mongoose.model('VoiesBiliaire', VoiBiliaireSchema);