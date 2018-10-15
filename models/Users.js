module.exports = function(sequelize, Sequelize) {

    return sequelize.define('users', {

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },

        first_name: {
            type: Sequelize.STRING,
            allowNull: true
        },

        last_name: {
            type: Sequelize.STRING,
            allowNull: true
        },

        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        },

        last_login: {
            type: Sequelize.DATE
        },

        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },

        new_user: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },

        data: {
            type: Sequelize.JSON,
            allowNull: true
        }
    },{
        underscored: true
    });
};