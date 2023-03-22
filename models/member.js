module.exports = (sequelize,type) => {
    const Member = sequelize.define('members',{
        id: {type: type.INTEGER, primaryKey:true, autoIncrement:true},
        name: type.STRING,
        lastname:type.STRING,
        address:type.STRING,
        phone:type.STRING,
        status:type.INTEGER
    });
    return Member;
};