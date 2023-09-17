const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    let Team = sequelize.define('Team', {
        team_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Team;
};
