const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

app.use(express.json({extended:true}));
app.use("/images" , express.static(path.join("backend/images")));

mongoose.connect('mongodb://localhost/post', {useNewUrlParser: true})
    .then(()=>{
        console.log('connection success');
    })
    .catch(()=>{
        console.log('connection is not success');
    });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT , DELETE, OPTIONS"
  );
  next();
});

app.use('/api/posts',postRoutes);
app.use('/api/user',userRoutes);


module.exports = app;
