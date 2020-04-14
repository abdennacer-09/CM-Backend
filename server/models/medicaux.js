const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicSchema = new Schema ({
    midicaux :{
        type: String
    },
    rmqMdc :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
    
});

module.exports = mongoose.model('Medicaux', MedicSchema);