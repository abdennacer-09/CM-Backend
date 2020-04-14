const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObstSchema = new Schema ({
    Obstetricaux : {
        type: String
    },
    rmqObst:{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
    
});

module.exports = mongoose.model('obstetricaux', ObstSchema);