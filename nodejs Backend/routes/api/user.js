const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const nodemailer = require('nodemailer');

const User = require('../../models/User');

router.post('/',async (req,res) => {

    const {name,email,password} = req.body;

    try {
        let user = await User.findOne({email});

        if(user) {
            res.status(400).json({errors:{msg:'User alredy exists'}})
        }

        let newUser = new User({
            name,email,password
        });

        const salt = await bcrypt.genSalt(10);

        newUser.password = await bcrypt.hash(password,salt);



        await newUser.save();

        const token = jwt.sign({_id: newUser._id},config.get('jwtSecret'));

        res.json({token});

        // var transporter = nodemailer.createTransport({service:'Sendgrid',auth:{user:process.env.SENDGRID_USERNAME,pass:process.env.SENDGRID_PASSWORD}});
        // var mailOptions = {from:'no-reply@yourwebapplication.com',to:user.email,subject:'Account Verification Token', text:'Hello,\n\n' + 'Please verify your account by clicking the link:\nhttp:\/\/'+ req.headers.host + '\/confirmation\/'+ token + '.\n'};
        // transporter.sendMail(mailOptions);

        // res.status(200).send('A verification email has been sent to ' + user.email + '.');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

    

});

module.exports = router;