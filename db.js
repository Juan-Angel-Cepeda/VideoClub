const Sequelize = require('sequelize');
const directorModel = require('./models/director');

//conexion para base de datos
//nombre DB
//User de DB
//Password de DB
//Objeto de configuración del ORM

const sequelize = new Sequelize('video-club',
'root','admin',{
    //objeto de configuración Host y dialecto
    host:'127.0.0.1',
    dialect:'mysql'
});

const Director = directorModel(sequelize, Sequelize);

sequelize.sync({
    force:true,

}).then(()=>{
    console.log("Base de datos actualizada");
});

module.exports = {Director};


