const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FamSchema = new Schema ({

    familiaux:{
        type: String
    },
    rmqFam:{
        type: String
    },
    patient:{
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }
    
});

module.exports = mongoose.model('Familiaux', FamSchema);