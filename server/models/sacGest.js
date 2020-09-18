const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SacGestSchema = new Schema ({
    nombre :{
        type: Number
    },
    position :{
        type: String
    },
    forme :{
        type: String
    },
    diametre :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
});

module.exports = mongoose.model('SacGest ', SacGestSchema);