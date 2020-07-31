module.exports = (sequelize, Sequelize) => {
  const userDetails = sequelize.define(
    "user_details",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
        allowNull: false,
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      location: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      avatar: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      dob: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    },
    {
      paranoid: true,
      underscored: true,
      timestamp: true,
    }
  );
  return userDetails;
};
