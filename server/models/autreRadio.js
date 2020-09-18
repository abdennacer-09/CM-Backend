const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AutreRadioSchema = new Schema ({
    ecg :{
        type: String
    },
    radioThoracique :{
        type: String
    },
    scanner :{
        type: String
    },
    irm :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
});

module.exports = mongoose.model('autresRadio', AutreRadioSchema);