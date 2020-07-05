module.exports = (sequelize,Sequelize)=>{
    const player_meta = sequelize.define('player_meta',{
        id:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true,
            allowNull: false
        },
        attribute_name: {
			type:Sequelize.STRING,
			allowNull: true,
        },
        attribute_value: {
			type:Sequelize.STRING,
			allowNull: true,
        },
    },{
         paranoid: true,
         underscored: true,
         timestamp: true ,
        })
    return player_meta
}