const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RateSchema = new Schema ({
    tailleRat :{
        type: String
    },
    structureRat :{
        type: String
    },
    contoursRat :{
        type: String
    },
    autresAnomaliesRat :{ 
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
    
});

module.exports = mongoose.model('Rate', RateSchema);