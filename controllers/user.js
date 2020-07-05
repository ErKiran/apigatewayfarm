const {User} = require('../models');
const logger = require('../logger')

async function CreateUser(req,res){
    try{
        const data = {
            user_name: req.body.userName,
            password: req.body.password
        }
        const newUser = await new User(data)
        await newUser.save()
        return res.json(newUser)
    }
    catch(err){
        logger.log({
            level: 'err',
            message: `Can't create User ${err}`,
            label: 'api',
        })
        throw new Error(`Can't create User ${err}`)
    }
}

module.exports = {
    CreateUser
}