const {Router} = require('express');
const {CreateUser} = require('../../controllers/user');

const router = Router()

router.post('/user',CreateUser)

module.exports = router