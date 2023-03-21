module.exports = (sequelize,type) => {
    const Copie = sequelize.define('copies',{
        id: {type: type.INTEGER, primaryKey:true, autoIncrement:true},
        number: type.INTEGER,
        format: type.ENUM("VHS","DVD","BLU RAY"),
        estatus: type.ENUM("AVILABLE","LOOSE","RENT")
    });
    return Copie;
};
