const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReinGchSchema = new Schema ({
    dimensionsGch :{
        type: String
    },
    differenciationGch :{
        type: String
    },
    dilatationGch :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
    
});

module.exports = mongoose.model('ReinGauche ', ReinGchSchema);