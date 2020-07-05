const {User} = require('../models');
const logger = require('../logger')

async function CreateUser(){
    try{

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