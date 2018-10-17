module.exports = function(sequelize, Sequelize) {

    let Countries = sequelize.define('countries', {

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

    return Countries;
};