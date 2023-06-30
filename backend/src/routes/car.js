const express = require('express')
const router = express.Router()
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const { createCar, getCarById } = require('../controllers/car');


const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req,file,cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
        // cb(null, 'http://localhost:7000/' + file.originalname)
    }
})
const upload = multer({storage})

router.post('/car/create',upload.array('carPictures'),createCar)
router.get('/car/:carId',getCarById)
module.exports = router;