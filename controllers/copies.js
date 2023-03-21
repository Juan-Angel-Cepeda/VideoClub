const express = require('express');
const {Copie} = require('../db');
const {Movie} = require('../db');

function list(req, res, next){
    Copie.findAll({include:['movies']})
        .then(objects => res.json(objects))
        .catch(err => res.send(err));
};

function index(req, res, next){
    res.send(`respond with a index = ${req.params.id}`);  
};

function create(req, res, next){
    let number = req.body.number;
    let movieId = req.body.movieId;
    let format = req.format;
    let estatus = req.estatus

    
    let copie = new Object({
      number:number,
      movieId:movieId,
      format:format,
      estatus:estatus
    });

    Movie.create(copie)
        .then(obj =>res.json(obj))
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