const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicSchema = new Schema ({
    hta :{
        type: String
    },
    diabete :{
        type: String
    },
    allergie :{
        type: String
    },
    autresMdc :{
        type: String
    },
    patient:{
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }
    
});

module.exports = mongoose.model('Medicaux', MedicSchema);