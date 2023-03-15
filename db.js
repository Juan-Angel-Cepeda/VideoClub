const Sequelize = require('sequelize');
const directorModel = require('./models/director');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');

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
const Movie = movieModel(sequelize,Sequelize);

//un genero puede tener muchas peliculas 
Genre.hasMany(Movie, {as:'movies'});
//una pelicula puede tener un genero
Movie.belongsTo(Genre,{as:'genre'});

//Un director puede tener muchas peliculas
Director.hasMany(Movie,{as:'movies'});
//Una pelicula puede tener un director
Movie.belongsTo(Director,{as:'director'});


sequelize.sync({
    force:true,

}).then(()=>{
    console.log("Base de datos actualizada");
}).catch(()=>{
    console.log("No connection");
});

module.exports = {Director,Genre,Movie};



