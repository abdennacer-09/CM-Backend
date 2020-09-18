const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RadioSchema = new Schema ({
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

module.exports = mongoose.model('Radiologie', RadioSchema);