const { Router } = require("express");
const passport = require('passport');
const { CreateUser, LoginUser,ActivateAccount } = require("../../controllers/user");

const router = Router();

router.post("/register", CreateUser);
router.post("/login", LoginUser);
router.post("/activate",passport.authenticate('jwt',{session:false}),ActivateAccount)

module.exports = router;
