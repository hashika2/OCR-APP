const express = require('express');
const connectDB  = require('./config/db');
const cors = require('cors');
// const multer = require('multer');
// const upload = multer();
const fileupload = require('express-fileupload');

const app = express();

connectDB();

app.use(express.json({extended: false}));
app.use(cors());
// app.use(upload.array());
// app.use(express.static('public'));
app.use(fileupload());

app.get('/',(req,res) => res.send('API Running'));

app.use('/api/user',require('./routes/api/user'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/image', require('./routes/api/saveImage'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Server start on port ${PORT}`));
