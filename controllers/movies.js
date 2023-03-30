const { json } = require('express');
const express = require('express');
const Director = require('../models/director');
const Movie = require('../models/movie');



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
    res.send(`respond with a index = ${req.params.id}`);  
};

async function create(req, res, next){
    const title = req.body.title;
    const directorId = req.body.directorId;

    let director = await Director.findOne({"_id":directorId})
    let movie = new Movie({
        title:title,
        director:director
    })

    movie.save().then(obj => res.status(200).json({
        message: "Pelicula creada correctamente",
        obj:obj
    })).catch(ex => res.status(500).json({
        message: "No se ha logrado crear la pelicula",
        err: ex
    }))
};

function replace(req, res, next){
    res.send(`respond with a replace =${req.params.id}`);  
};

function update(req, res, next){
    res.send(`respond with an update =${req.params.id}`);  
};

function destroy(req, res, next){
    res.send(`respond with a destroy =${req.params.id}`);  
};

module.exports = {list,index,create,update,destroy,replace};