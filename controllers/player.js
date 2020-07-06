const {Player,PlayerMeta,sequelize} = require('../models');
const {Response} = require('../utils/response');
const logger = require('../logger');

async function AddPlayers(req,res){
    let transaction;
    try{
        transaction = await sequelize.transaction()
        const {name,dateOfBirth,basePrice,playerType,country,sex,playerPicture} = req.body;
        const data={
            name,
            dob: dateOfBirth,
            base_price: basePrice,
            player_type: playerType,
            country,
            sex,
        };
        console.log(playerPicture)
        
        const newPlayers = await Player.create(data,{transaction})

        if(playerPicture && playerPicture.length !==0){
            let playerMetaArray = [];
            playerPicture.map(i=>{
                playerMetaArray.push({
                    attribute_name:"LINK",
                    attribute_value: i,
                    playerId: newPlayers.id
                })
            })

           await PlayerMeta.bulkCreate(playerMetaArray,{transaction})
        }
        await transaction.commit()
        return Response(res,200,"Success",newPlayers)
    }
    catch(err){
        if (transaction) await transaction.rollback();
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