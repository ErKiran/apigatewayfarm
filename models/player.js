module.exports = (sequelize,Sequelize)=>{
    const players = sequelize.define('players',{
        id:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true,
            allowNull: false
        },
        name: {
			type:Sequelize.STRING,
			allowNull: false,
        },
        dob:{
            type: Sequelize.DATE,
            allowNull: true,
        },
        base_price:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        player_type:{
            type: Sequelize.STRING,
            allowNull: false
        },
        country: {
			allowNull: false,
			type:Sequelize.STRING,
        },
        sex: {
			type:Sequelize.ENUM('MALE', 'FEMALE'),
			allowNull: false,
			defaultValue: 'MALE'
		},
    },{
         paranoid: true,
         underscored: true,
         timestamp: true ,
        })
    return players
}