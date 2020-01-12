const jwt = require("jsonwebtoken");

module.exports = (request , respose , next ) => {
    try{
        const token = request.headers.authorization.split(" ")[1];
        jwt.verify(token , "secret_this_should_be_longer");
        next();
    }catch{
        respose.status(401).send({message:"Auth failed"});
    }
};