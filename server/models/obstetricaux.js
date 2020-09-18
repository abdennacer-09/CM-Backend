const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObstSchema = new Schema ({
    Obstetricaux : {
        type: String
    },
    rmqObst:{
        type: String
    },
    patient:{
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }
    
});

module.exports = mongoose.model('obstetricaux', ObstSchema);