const express = require('express');
const {Actor} = require('../db');

function list(req, res, next){
    Actor.findAll({include:'movies'})
            .then(objects => res.json(objects))
            .catch(err => res.send(err));
};

function index(req, res, next){
    const id = req.params.id;
    Actor.findByPk(id)
            .then(object => res.json(object))
            .catch(err => res.send(err));
};

function create(req, res, next){
    let name = req.body.name;
    let lastname = req.body.lastname;

    let actor = new Object({
        name:name,
        lastname:lastname
    });

    Actor.create(actor)
            .then(obj => res.json(obj))
            .catch(err => res.send(err));
};

function replace(req, res, next){
    const id = req.params.id;
    Actor.findByPk(id)
            .then((object)=>{
                const name = req.body.name ? req.body.name :"";
                const lastName = req.body.lastName ? req.body.lastNamename :"";
                object.update({name:name,lastName:lastName})
                .then(obj => res.json(obj))
                .catch(err => res.send(err));
            })
            .catch(err => res.send(err));
    }

function update(req, res, next){
    const id = req.params.id;
    Actor.findByPk(id)
            .then((object)=>{
                const name = req.body.name ? req.body.name :object.name;
                const lastName = req.body.lastName ? req.body.lastNamename: object.lastName;
                object.update({name:name,lastName:lastName})
                .then(obj => res.json(obj))
                .catch(err => res.send(err));
            })
            .catch(err => res.send(err));
};

function destroy(req, res, next){
    const id = req.params.id;
    Actor.destroy({where:{id:id}})
            .then(obj => res.json(obj))
            .catch(err => res.send(err));
};

module.exports = {list,index,create,update,destroy,replace};