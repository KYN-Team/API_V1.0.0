module.exports = function(sequelize, Sequelize) {

    return sequelize.define('roles', {

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },

        name: {
            type: Sequelize.STRING,
            allowNull: false
        },

        data: {
            type: Sequelize.JSON,
            allowNull: true
        }
    },{
        underscored: true
    });
};