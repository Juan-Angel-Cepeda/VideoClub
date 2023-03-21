const Sequelize = require('sequelize');
const directorModel = require('./models/director');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');
const actorModel = require('./models/actor');
const movieActorModel = require('./models/movie_actor');
const copieModel = require('./models/copie');
const membersModel = require('./models/member');
const bookingModel = require('./models/booking');
const copie = require('./models/copie');
const booking = require('./models/booking');

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
const Actor = actorModel(sequelize,Sequelize);
const Movie = movieModel(sequelize,Sequelize);
const MovieActor = movieActorModel(sequelize,Sequelize);
const Copie = copieModel(sequelize,Sequelize);
const Member = membersModel(sequelize,Sequelize);
const Booking = bookingModel(sequelize,Sequelize);


//un genero puede tener muchas peliculas 
Genre.hasMany(Movie, {as:'movies'});
//una pelicula puede tener un genero
Movie.belongsTo(Genre,{as:'genre'});

//Un director puede tener muchas peliculas
Director.hasMany(Movie,{as:'movies'});
//Una pelicula puede tener un director
Movie.belongsTo(Director,{as:'director'});

//Un actor participa en muchas peliculas
MovieActor.belongsTo(Movie,{foreignKey:'moviesId'});

//En una pelicula participan muchos actores
MovieActor.belongsTo(Actor,{foreignKey:'actorId'});

Movie.belongsToMany(Actor,{
    foreignKey:'actorId',
    as:'actors',
    through: 'movies_actors'
});

Actor.belongsToMany(Movie,{
    foreignKey: 'movieId',
    as: 'movies',
    through: 'movies_actors'
});


Booking.hasMany(Copie,{as:'copies'});

//Copie.belongsTo(Booking,{foreignKey,})


//Una pelicula tiene muchas copias
Movie.hasMany(Copie,{as:'copies'});
//la copia es de una pelicula
Copie.belongsTo(Movie,{foreignKey:'movieId'});

//Un miembro tiene muchas rentas
Member.hasMany(Booking,{as:'bookings'});
//las rentas pertenecen a un miembro
Booking.belongsTo(Member,{foreignKey:'memberId'});


sequelize.sync({
    force:true,

}).then(()=>{
    console.log("Base de datos actualizada");
}).catch(()=>{
    console.log("No connection");
});

module.exports = {Director,Genre,Movie,Actor,Copie,Member,Booking};



