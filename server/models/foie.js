const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoieSchema = new Schema ({
    tailleFoi :{
        type: String
    },
    structureFoi :{
        type: String
    },
    contoursFoi :{
        type: String
    },
    autresAnomalies :{ 
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
    
});

module.exports = mongoose.model('Foie', FoieSchema);