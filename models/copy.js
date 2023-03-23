const { DataTypes } = require("sequelize");


module.exports = (sequelize,type) => {
    const Copy = sequelize.define('copies',{
        id: {type: type.INTEGER, primaryKey:true, autoIncrement:true},
        number:type.INTEGER,
        format:DataTypes.ENUM("VHS","DVD","BLU RAY"),
        estatus:DataTypes.ENUM("AVILABLE", "LOOSE", "RENT")
    });
    return Copy;
};

