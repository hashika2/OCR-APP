const mongoose = require("mongoose");

const imageTextShema = mongoose.Schema({
    text : String
});

module.exports = mongoose.model('Text' , imageTextShema);