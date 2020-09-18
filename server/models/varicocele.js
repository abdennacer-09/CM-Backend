const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VaricoceleSchema = new Schema ({
    varicDr :{
        type: String
    },
    varicGch :{
        type: String
    },
    consultation:{
        type: Schema.Types.ObjectId,
        ref: 'Consultation'
    }
});

module.exports = mongoose.model('varicocele', VaricoceleSchema);