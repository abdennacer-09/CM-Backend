const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MensurationSchema = new Schema ({
    lcc :{
        type: String
    },
    bip :{
        type: String
    },
    fl :{
        type: String
    },
    dat :{
        type: String
    },
    hc :{
        type: String
    },
    autresMens :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
});

module.exports = mongoose.model('Mensurations', MensurationSchema);