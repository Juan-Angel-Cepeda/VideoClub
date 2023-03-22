const express = require('express');

function list(req, res, next){
    res.send('respond with a list');  
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