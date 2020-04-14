const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamParaClinSchema = new Schema ({
    biologie :{
        type: String
    },
    rmqBiologie :{
        type: String
    },
    radiologie:{
        type: String
    },
    rmqRadio :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
    
});

module.exports = mongoose.model('ExamenParaClinique', ExamParaClinSchema);