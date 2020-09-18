const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EpididymesSchema = new Schema ({
    epidDr :{
        type: String
    },
    epidGch :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
});

module.exports = mongoose.model('epididymes', EpididymesSchema);