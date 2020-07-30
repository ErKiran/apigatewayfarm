const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const {User} = require('../models');
const {Response} = require('../utils/response');
const {JWT_SECRET} = process.env;
const logger = require('../logger');
const response = require('../utils/response');

async function CreateUser(req,res){
    try{
        const {email,password} = req.body;
        const data = {
            email,
            password
        }
        const isUserExists = await User.findOne({where:{email}})
        if (isUserExists){
            return response(200,"Success","Email Alreay Taken",null)
        }
        const newUser = await new User(data)
        await newUser.save()
        return res.json(newUser)
    }
    catch(err){
        logger.log({
            level: 'error',
            message: `Can't create User ${err}`,
            label: 'api',
        })
        throw new Error(`Can't create User ${err}`)
    }
}

async function LoginUser(req,res){
    try{
        const {email,password} = req.body;
        if (!email || !password){
            return Response(res,200,`email and password is required`,null)
        }
        const user = await User.findOne({where:{email}});
        if (!user){
           return Response(res,200,"Success",null)
        }
        
        const isValid = await bcrypt.compare(password,user.password)
        if(!isValid){
            return Response(res,401,"UnAuthorized",null)
        }

        const payload = {id: user.id, role: user.role,email: user.email};
        const token = await jwt.sign(payload,JWT_SECRET,{expiresIn:3600})
        return Response(res,200,"Success",`Bearer ${token}`)

    }
    catch(err){
        logger.log({
            level: 'error',
            message: `Can't login User ${err}`,
            label: 'api',
        })
        throw new Error(`Can't login to the System ${err}`)
    }
}

module.exports = {
    CreateUser,
    LoginUser,
}