module.exports = (sequelize,type) => {
    const Copy = sequelize.define('Copies',{
        id: {type: type.INTEGER, primaryKey:true, autoIncrement:true},
        number:type.INTEGER,
        format:Sequelize.ENUM("VHS","DVD","BLU RAY"),
        estatus:Sequelize.ENUM("AVILABLE", "LOOSE", "RENT")
    });
    return Copy;
};

