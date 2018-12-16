const express = require('express');
const router = express.Router();
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');

const UserCtrl = require('../controllers/user');

require('dotenv').config();

cloudinary.config({
    cloud_name: "huy-dev",
    api_key : "471991285564824",
    api_secret: "9n66PqK_BvrDayWg2qIV4-hRQY8"
})

router.post( '/image-upload', UserCtrl.authMiddleware, formidable() ,(req, res) => {

    cloudinary.uploader.upload( req.files.file.path, (result) =>{


        res.status(200).send({
            public_id : result.public_id,
            url : result.url
        })

    },{
        public_id : `${Date.now()}`,
        resource_type : 'auto'
    })
    
})

module.exports = router