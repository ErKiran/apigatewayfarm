const {Player} = require('../models');
const logger = require('../logger');

async function AddPlayers(req,res){
    try{
        const {name,dateOfBirth,basePrice,playerType,country,sex,playerPicture} = req.body;
        const data={
            name,
            dob: dateOfBirth,
            base_price: basePrice,
            player_type: playerType,
            country,
            sex,
        };
        const newPlayer = await new Player(data);
        await newPlayer.save();
    }
    catch(err){
        logger.log({
            level: 'error',
            message: `Can't create Player ${err}`,
            label: 'api',
        })
        throw new Error(`Can't add players ${err}`)
    }
}

module.exports={
    AddPlayers,
}