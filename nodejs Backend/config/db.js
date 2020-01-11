const mogoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async() =>{
    try {
        await mogoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology: true 
        });

        console.log('MongoDB Connected..');
    } catch (err) {
        console.error(err.message);

        
    }
}

module.exports = connectDB;