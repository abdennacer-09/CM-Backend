const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HydroceleSchema = new Schema ({
    hydrDr :{
        type: String
    },
    hydrGch :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    } 
});

module.exports = mongoose.model('hydrocele', HydroceleSchema);