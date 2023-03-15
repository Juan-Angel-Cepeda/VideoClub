const express = require('express');
const { Movie } = require('../db');

function list(req, res, next){
    Movie.findAll({include:['genre','director']})
        .then(objects => res.json(objects))
        .catch(err => res.send(err));
};

function index(req, res, next){
    res.send(`respond with a index = ${req.params.id}`);  
};

function create(req, res, next){
    let tile = req.body.title;
    const genreId = req.body.genreId;
    const directorId = req.body.directorId;
    
    let movie = new Object({
        title:tile,
        genreId:genreId,
        directorId:directorId
    });

    Movie.create(movie)
        .then(obj=>res.json(obj))
        .catch(err => res.send(err));

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