const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TesticuleSchema = new Schema ({
    mmDr :{
        type: String
    },
    contoursDr :{
        type: String
    },
    echostructureDr :{
        type: String
    },
    AvEcDpCDr :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
});

module.exports = mongoose.model('TesticulesDr', TesticuleSchema);