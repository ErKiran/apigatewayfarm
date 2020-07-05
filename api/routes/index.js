const {Router} = require('express');
const passport = require('passport');
const {CreateUser,LoginUser} = require('../../controllers/user');

const router = Router()

router.post('/user',CreateUser)
router.post('/login',LoginUser)

router.get('/private',passport.authenticate('jwt',{session:false}), (req,res)=>{
        console.log(req.user)
       return res.json({
        msg: "Hello"
    })
} )

module.exports = router