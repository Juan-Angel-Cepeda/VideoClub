const { json } = require('express');
const express = require('express');
const Director = require('../models/director');
const Movie = require('../models/movie');
const Actor = require('../models/actor');
const Genre = require('../models/genre');



function list(req, res, next){
    Movie.find().populate("_director").then(objs => res.status(200).json({
        message: "Listado de peliculas",
        obj: objs
    })).catch( ex => res.status(500).json({
        message: "No se pudieron listar las peliculas",
        obj: ex
    }));
};

function index(req, res, next){
    const id = req.params.id;
    Movie.findOne({"_id":id}).then(obj=>res.status(200).json({
        message:`Movie con id ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"No info",
        err:ex
    }))
};

async function create(req, res, next){
    const title = req.body.title;
    const directorId = req.body.directorId;
    const genreId = req.body.genreId;
    const actorId = req.body.actorId;

    let director = await Director.findOne({"_id":directorId})
    let genre = await Genre.findOne({"_id":genreId});
    let actor = await Actor.findOne({"_id":actorId});
    
    let movie = new Movie({
        title:title,
        director:director,
        genre:genre,
        actor:actor
    })

    movie.save().then(obj => res.status(200).json({
        message: "Pelicula creada correctamente",
        obj:obj
    })).catch(ex => res.status(500).json({
        message: "No se ha logrado crear la pelicula",
        err: ex
    }))
};

async function replace(req, res, next){
    const id = req.params.id;
    let title = req.body.title ? req.body.title:"";
    let directorId = req.body.directorId ? req.body.directorId:"";
    let genreId = req.body.genreId ? req.body.genreId:"";
    let actorId = req.body.actorId ? req.body.actorId:"";

    let director = await Director.findOne({"id":directorId});
    let genre = await Genre.findOne({"_id":genreId});
    let actor = await Actor.findOne({"_id":actorId});

    let movie = new Object({
        _title:title,
        _director:director,
        _genre:genre,
        _actor:actor
    })
    Movie.findByIdAndUpdate({"_id":id},movie,{new:true})
         .then(obj=> {res.status(200).json({
            message:"Movie updated",
            obj:obj
         })}).catch(ex => res.status(500).json({
            message:"Movie not pudated"
         }))
    
};

async function add_actor_to_cast(actorId){
    actor = await Actor.findOne({"_id":actorId});
    actors.push(actor)
    return actors
};

async function update(req, res, next){
    
    let id = req.params.id;
    let title = req.body.title
    let directorId = req.body.directorId
    let genreId = req.body.genreId
    let actorId = req.body.actorId

    let movie = new Object();

    director = await Director.findOne({"_id":directorId});
    genre = await Genre.findOne({"_id":genreId});
    actors = add_actor_to_cast(actorId);
    

    if(title){
        movie._title = title;
    }
    if(genre){
        movie._genre = genre;
    }
    if(actor){
        movie._actor = actors;
    }
    
    Movie.findOneAndUpdate({"_id":id},movie)
         .then(obj=>res.status(200).json({
            message:"Movie updates",
            obj:obj
         })).catch(ex => res.status(500).json({
            message:"Movie not updated",
            err:ex
         }))
};

function destroy(req, res, next){
    const id = req.params.id;
    Movie.findByIdAndRemove({"_id":id}).then(obj=>res.status(200).json({
        message:"Movie deleted",
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"Movie not deleted",
        err:ex
    }))
};

module.exports = {list,index,create,update,destroy,replace};