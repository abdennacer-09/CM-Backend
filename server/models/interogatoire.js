const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterogSchema = new Schema ({
    motif :{
        type: String
    },
    rmqMotif :{
        type: String
    },
    patient:{
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }
    
});

module.exports = mongoose.model('Interogatoire', InterogSchema);