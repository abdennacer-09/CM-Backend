const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrdnSchema = new Schema ({
    quantite :{
        type: String
    },
    prise :{
        type: String
    },
    periode:{
        type: String
    },
    nbrParJour:{
        type: Number
    },
    quand :{
        type: String
    },
    remarque:{
        type: String
    },
    medicament:{
        //type: Schema.Types.ObjectId,
        //ref: 'Medicaments'
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
    
});

module.exports = mongoose.model('Ordonnance', OrdnSchema);