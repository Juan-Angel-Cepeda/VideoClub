const express = require('express');
const {Member} = require('../db');

function list(req, res, next){
    Member.findAll()
        .then(objects = res.json(objects))
        .catch(err => res.send(err));
};

function index(req, res, next){
    const id = req.params.id;
    Member.findByPk(id)
            .then(object => res.json(object))
            .catch(err => res.send(err));
};

function create(req, res, next){
    let name = req.body.name;
    let last_name = req.body.last_name;
    let address = req.body.address;
    let phone = req.body.phone;
    let status = req.body.status;

    let member = new Object({
        name: name,
        last_name : last_name,
        address : address,
        phone : phone,
        status : status
    })

    Member.create(member)
            .then(object => res.json(object))
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