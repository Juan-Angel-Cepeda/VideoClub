module.exports = (sequelize,type) => {
    const Director = sequelize.define('directors',{
        id: {type: type.INTEGER, primaryKey:true, autoIncrement:true},
        tile: type.STRING
    });
    return Director;
};