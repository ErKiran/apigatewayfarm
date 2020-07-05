const {Router} = require('express');
const {CreateUser,LoginUser} = require('../../controllers/user');

const router = Router()

router.post('/user',CreateUser)
router.post('/login',LoginUser)

module.exports = router