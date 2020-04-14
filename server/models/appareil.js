const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApprSchema = new Schema ({
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

module.exports = mongoose.model('Appareil', ApprSchema);