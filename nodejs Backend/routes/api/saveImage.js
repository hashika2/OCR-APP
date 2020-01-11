const express = require('express');
const router = express.Router();
const tesseract = require('tesseract.js');
const auth = require('../../middleware/auth');

const Image = require('../../models/Image');

router.post('/',auth,async(req,res) => {
    try {
        const result = await tesseract.recognize(req.files.photo.data);
        console.log(result.data.text);

        if(result){
            res.send(result.data.text);
        }

        let image = new Image({
            user: req.user._id,
            image: req.files.photo.data,
            text :result.data.text
           });


    
        await image.save();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

    
    


   
})

module.exports = router;
 