const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmbryonSchema = new Schema ({
    positionEmb :{
        type: String
    },
    activiteCardiaque :{
        type: String
    },
    fcActiv:{
        type: String
    },
    mouvementFoetus :{
        type: String
    },
    liquideAmniotique :{
        type: String
    },
    placenta1 :{
        type: String
    },
    placenta2 :{
        type: String
    },
    placenta3 :{
        type: String
    },
    ageGestationnel :{
        type: String
    },
    datePresume :{
        type: Date
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
});

module.exports = mongoose.model('Embryon ', EmbryonSchema);