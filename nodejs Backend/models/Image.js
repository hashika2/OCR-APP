const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    image:{
        type:Buffer,
        required:true
    },
    text:{
        type:String,
        required:true,
    }
    
});

module.exports = Image = mongoose.model('Image',ImageSchema);