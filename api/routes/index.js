const {Router} = require('express');
const {CreateUser} = require('../../controllers/user');

const router = Router()

router.post('api/v1/user',CreateUser)

module.exports = router