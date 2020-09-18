const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamClinSchema = new Schema ({
    geniral :{
        type: String
    },
    rmqGeneral :{
        type: String
    },
    appareil:{
        type: String
    },
    rmqAppr :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
    
});

module.exports = mongoose.model('ExamenClinique', ExamClinSchema);