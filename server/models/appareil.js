const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApprSchema = new Schema ({
    abdominal :{
        type: String
    },
    pleuropulmonaire :{
        type: String
    },
    cardiovasculaire :{
        type: String
    },
    gynecologique :{
        type: String
    },
    osteoarticulaire :{
        type: String
    },
    reste :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
    
});

module.exports = mongoose.model('Appareil', ApprSchema);