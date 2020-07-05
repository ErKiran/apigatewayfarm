const bcrypt = require('bcryptjs');
module.exports = (sequelize,Sequelize)=>{
    const users = sequelize.define('users',{
        id:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true,
            allowNull: false
        },
        user_name: {
			type:Sequelize.STRING,
			allowNull: false,
        },
        password: {
			allowNull: false,
			type:Sequelize.STRING,
        },
        role: {
			type:Sequelize.ENUM('ADMIN', 'USER'),
			allowNull: false,
			defaultValue: 'USER'
		},
    },{
         paranoid: true,
         underscored: true,
         timestamp: true ,
         hooks:{
             beforeCreate: async (user)=>{
                 const salt = await bcrypt.genSalt(10);
                 user.password = await bcrypt.hash(user.password,salt)
             }
         },
        })
    return users
}