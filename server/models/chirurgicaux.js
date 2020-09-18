const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChirSchema = new Schema ({

    chirurgicaux :{
        type: String
    },
    rmqChirg:{
        type: String
    },
    patient:{
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }
    
});

module.exports = mongoose.model('Chirurgicaux', ChirSchema);