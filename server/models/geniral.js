const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenrSchema = new Schema ({
    geniral :{
        type: String
    },
    rmqGeneral :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
    
});

module.exports = mongoose.model('Geniral', GenrSchema);