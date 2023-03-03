const express = require('express');
const {Director} = require('../db');

function list(req, res, next){
    Director.findAll()
            .then(objects => res.json(objects))
            .catch(err => res.send(err));
};

function index(req, res, next){
    const id = req.params.id;
    Director.findByPk(id)
            .then(object => res.json(object))
            .catch(err => res.json(err));
};

function create(req, res, next){
    let name = req.body.name;
    let lastname = req.body.lastname;

    let director = new Object({
        name:name,
        lastname:lastname
    });

    Director.create(director)
            .then(obj => res.json(obj))
            .catch(err => res.json(err));
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