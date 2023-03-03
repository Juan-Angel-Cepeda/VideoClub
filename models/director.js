module.exports = (sequelize,type) => {
    const Director = sequelize.define('directors',{
        id: {type: type.INTEGER, primaryKey:true, autoIncrement:true},
        name: type.STRING,
        lastname: type.STRING
    });
    return Director;
};