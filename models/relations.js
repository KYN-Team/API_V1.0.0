module.exports = function(db) {

    /**
     * Relation between Users and Roles (belongsToMany)
     */
    db.users.belongsToMany(db.roles, {through: 'userRoles', foreignKey: 'user_id', as:'userHasRoles'});
    db.roles.belongsToMany(db.users, {through: 'userRoles', foreignKey: 'role_id', as:'roleHasUsers'});


    /**
     * Relation between Coutries and Regions
     */
    db.countries.belongsTo(db.regions, {foreignKey: 'region_id'});
    db.regions.hasMany(db.countries, {foreignKey: 'region_id'});

};