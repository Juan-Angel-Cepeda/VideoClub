const Sequelize = require('sequelize');
const directorModel = require('./models/director');
const genreModel = require('./models/genre');

//conexion para base de datos
//nombre DB
//User de DB
//Password de DB
//Objeto de configuración del ORM

const sequelize = new Sequelize('video-club',
'root','secret',{
    //objeto de configuración Host y dialecto
    host:'127.0.0.1',
    dialect:'mysql'
});

const Director = directorModel(sequelize, Sequelize);
const Genre = genreModel(sequelize,Sequelize);

sequelize.sync({
    force:true,

}).then(()=>{
    console.log("Base de datos actualizada");
}).catch(()=>{
    console.log("No connection");
});

module.exports = {Director,Genre};



