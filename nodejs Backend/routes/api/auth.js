const express = require('express');
const router = express.Router();
const config = require('config')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

router.post('/',async (req,res) => {

    const {email,password} = req.body;

    try {
        let user = await User.findOne({email});

        if(!user) {
            res.status(400).json({errors:{msg:'Invalid Email or Password'}})
        }

        const validPassword = bcrypt.compare(password,user.password);
        if(!validPassword){
            res.status(400).send('Invalid Email or Password');
        }

        // if(!user.isVerified){
        //     res.status(401).send('Your account has not been verified');
        // }

        const token = jwt.sign({_id: user._id},config.get('jwtSecret'));
        
        res.json({token});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

    

});

module.exports = router;