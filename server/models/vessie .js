const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VessieSchema = new Schema ({
    repletion :{
        type: String
    },
    contenu :{
        type: String
    },
    parois :{
        type: String
    },
    residuPostMictionnel :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
    
});

module.exports = mongoose.model('Vessie ', VessieSchema);