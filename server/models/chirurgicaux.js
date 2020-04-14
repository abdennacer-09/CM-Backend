const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChirSchema = new Schema ({

    chirurgicaux :{
        type: String
    },
    rmqChirg:{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
    
});

module.exports = mongoose.model('Chirurgicaux', ChirSchema);