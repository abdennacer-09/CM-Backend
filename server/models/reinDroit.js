const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReinDrSchema = new Schema ({
    dimensions :{
        type: String
    },
    differenciation :{
        type: String
    },
    dilatation :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
    
});

module.exports = mongoose.model('ReinDroit ', ReinDrSchema);