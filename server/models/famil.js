const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FamSchema = new Schema ({

    familiaux:{
        type: String
    },
    rmqFam:{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
    
});

module.exports = mongoose.model('Familiaux', FamSchema);