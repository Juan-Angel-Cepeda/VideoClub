const express = require('express');
const Genre = require('../models/actor');

function list(req, res, next){
    Genre.find().then(objs => res.status(200).json({
        message:"Lista de generos",
        obj:objs
    })).catch(ex => res.status(500).json({
        message:"Error en la consulta",
        obj:ex
    }))
};

function index(req, res, next){
    res.send(`respond with a index = ${req.params.id}`);  
};

function create(req, res, next){
    res.send(`respond with a a created name = ${name} and lastname = ${lastname}`);  
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