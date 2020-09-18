const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AntecSchema = new Schema ({
    midicaux :{
        type: String
    },
    rmqMdc :{
        type: String
    },
    familiaux:{
        type: String
    },
    rmqFam:{
        type: String
    },
    chirurgicaux :{
        type: String
    },
    rmqChirg:{
        type: String
    },
    Obstetricaux : {
        type: String
    },
    rmqObst:{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
    
});

module.exports = mongoose.model('Antecdent', AntecSchema);