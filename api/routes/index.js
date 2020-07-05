const {Router} = require('express');
const passport = require('passport');
const {CreateUser,LoginUser} = require('../../controllers/user');

const {UploadImage} = require('../../controllers/imageUpload');

const router = Router()

router.post('/user',CreateUser)
router.post('/login',LoginUser)

router.get('/private',passport.authenticate('jwt',{session:false}), (req,res)=>{
       return res.json({
        msg: "Hello"
    })
})

router.post('/upload',UploadImage)

module.exports = router