const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CatSchema = new Schema ({
    nom :{
        type:String
    }
    
});

module.exports = mongoose.model('Categorie', CatSchema);