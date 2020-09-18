const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenrSchema = new Schema ({
    ta :{
        type: String
    },
    poids :{
        type: String
    },
    gpp :{
        type: String
    },
    hu :{
        type: String
    },
    fc :{
        type: String
    },
    gaj :{
        type: String
    },
    temperature :{
        type: String
    },
    omi :{
        type: String
    },
    patient:{
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }
    
});

module.exports = mongoose.model('Geniral', GenrSchema);