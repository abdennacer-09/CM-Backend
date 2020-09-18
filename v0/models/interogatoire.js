const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterogSchema = new Schema ({
    motif :{
        type: String
    },
    rmqMotif :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
    
});

module.exports = mongoose.model('Interogatoire', InterogSchema);