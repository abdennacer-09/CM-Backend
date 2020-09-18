const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TesticuleGchSchema = new Schema ({
    mmGch :{
        type: String
    },
    contoursGch :{
        type: String
    },
    echostructureGch :{
        type: String
    },
    AvEcDpCGch :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
});

module.exports = mongoose.model('TesticulesGch', TesticuleGchSchema);