module.exports = (sequelize,type) => {
    const Actor = sequelize.define('actors',{
        id: {type: type.INTEGER, primaryKey:true, autoIncrement:true},
        name: type.STRING,
        lastname:type.STRING
    });
    return Actor;
};