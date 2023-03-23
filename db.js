const Sequelize = require('sequelize');

const directorModel = require('./models/director');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');
const actorModel = require('./models/actor');
const movieActorModel = require('./models/movie_actor');
const bookingModel = require('./models/booking');
const memberModel = require('./models/member');
const copyModel = require('./models/copy');

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

const Movie = movieModel(sequelize,Sequelize);
const Director = directorModel(sequelize, Sequelize);
const Genre = genreModel(sequelize,Sequelize);
const Actor = actorModel(sequelize,Sequelize);
const MovieActor = movieActorModel(sequelize,Sequelize);
const Booking = bookingModel(sequelize,Sequelize);
const Member = memberModel(sequelize,Sequelize);
const Copy = copyModel(sequelize,Sequelize);

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


//una pelicula tiene muchas copias
Movie.hasMany(Copy,{as:"copies"});
//una copia pertenece a una pelicula
Copy.belongsTo(Movie,{as:'movie'});

//una reserva tiene muchas copias
Booking.hasMany(Copy,{as:"copies"});
//una copia pertenece a una reserva
Copy.belongsTo(Booking,{as:"booking"});

Member.hasMany(Booking,{as:"bookings"});
Booking.belongsTo(Member,{as:"memeber"});


sequelize.sync({
    force:true,
    }).then(()=>{
    console.log("Base de datos actualizada");
    });

module.exports = {Director,Genre,Movie,Actor,Booking,Member,Copy};



