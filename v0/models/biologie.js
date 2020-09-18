const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamBioSchema = new Schema ({
    biologie :{
        type: String
    },
    rmqBiologie :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
    
});

module.exports = mongoose.model('Biologie', ExamBioSchema);