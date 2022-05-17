module.exports = (sequelize, Sequelize) => {
    const Configuration = sequelize.define('configuration', {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(),
            allowNull: false,
            unique: true,
        },
        options: {
            type: Sequelize.TEXT(),
            allowNull: false,
        }
    },
    {
        timestamps: false
    });

    return Configuration;
}