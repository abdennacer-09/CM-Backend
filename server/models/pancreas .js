const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PancreasSchema = new Schema ({
    pancreas :{
        type: String
    },
    rmqPancreas :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
    
});

module.exports = mongoose.model('Pancreas ', PancreasSchema);