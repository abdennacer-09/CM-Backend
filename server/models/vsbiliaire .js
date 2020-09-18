const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VsBilSchema = new Schema ({
    tailleVsB :{
        type: String
    },
    paroisVsB :{
        type: String
    },
    formeVsB :{
        type: String
    },
    autresVsB :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
    
});

module.exports = mongoose.model('VesiculeBiliaire ', VsBilSchema);