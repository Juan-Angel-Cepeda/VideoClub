const express = require('express');
const Director = require('../models/director');


function list(req, res, next){
    Director.find().then(objs => res.status(200).json({
        message:res.__("Director.list"),
        obj:objs
    })).catch(ex => res.status(500).json({
        message:res.__("Director.notlist"),
        obj:ex
    }));
};

function index(req, res, next){
    const id = req.params.id;
    Director.findOne({"_id":id}).then(obj=>res.status(200).json({
        message:res.__("Director.index"),
        obj: obj
    })).catch(ex => res.status(500).json({
            message:res.__("Director.notindex"),
            obj:ex
        }));
};

function create(req, res, next){
    let name = req.body.name;
    let lastName = req.body.lastName;
    
    let director = new Director({
        name:name,
        lastName:lastName
    });

    director.save().then(obj => res.status(200).json({
        message:res.__("Director.create"),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__("Director.notcreate"),
        obj:ex
    }));
};

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";

    let director = new Object({
        _name : name,
        _lastName : lastName
    });

    Director.findOneAndUpdate({"_id":id},director,{new : true})
            .then(obj => {res.status(200).json({
                message:res.__("Director.replace"),
                obj:obj
            })}).catch(ex => res.status(500).json({
                message:res.__("Director.notreplace"),
                err:ex
            }));
};

function update(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;

    let director = new Object();

    if(name){
        director._name = name;
    }
    if(lastName){
        director._lastName = lastName;
    }

    Director.findOneAndUpdate({"_id":id},director)
            .then(obj => res.status(200).json({
                message:res.__("Director.update"),
                obj:obj
            })).catch(ex => res.status(500).json({
                message:res.__("Director.notupdate"),
                obj:ex
            }));
};

function destroy(req, res, next){
    const id = req.params.id;
    Director.findOneAndDelete({"_id":id}).then(obj => res.status(200).json({
        message:res.__("Director.delete"),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__("Director.notdelete"),
        err:ex
    }));
};

module.exports = {list,index,create,update,destroy,replace};