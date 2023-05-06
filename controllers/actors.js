const express = require('express');
const Actor = require('../models/actor');
const log4js = require('log4js');
var logger = log4js.getLogger();

function list(req, res, next){
    Actor.find().then(objs => {
        logger.level("info");
        logger.info(res.__("Actor.list"));
        res.status(200).json({
        message:res.__("Actor.list"),
        obj:objs
    })}).catch(ex => {
        logger.level("error");
        logger.error(res.__('Actor.noinfo'));
        res.status(500).json({
        message:res.__("Actor.noinfo"),
        obj:ex
    })});
};

function index(req, res, next){
    const id = req.params.id;
    Actor.findOne({"_id":id}).then(obj=>res.status(200).json({
        message: res.__('Actor.index'),
        obj: obj
    })).catch(ex => res.status(500).json({
            message: res.__('Actor.noinfo'),
            obj:ex
        }));
};

function create(req, res, next){
    let name = req.body.name;
    let lastName = req.body.lastName;
    
    let actor = new Actor({
        name:name,
        lastName:lastName
    });

    actor.save().then(obj => res.status(200).json({
        message:res.__('Actor.created'),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__('Actor.notCreated'),
        obj:ex
    }));
};

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";

    let actor = new Object({
        _name : name,
        _lastName : lastName
    });

    Actor.findOneAndUpdate({"_id":id},actor,{new : true})
            .then(obj => {res.status(200).json({
                message:res.__('Actor.replaced'),
                obj:obj
            })}).catch(ex => res.status(500).json({
                message:res.__("Actor.notReplaced"),
                obj:ex
            }));
};

function update(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;

    let actor = new Object();

    if(name){
        actor._name = name;
    }
    if(lastName){
        actor._lastName = lastName;
    }

    Actor.findOneAndUpdate({"_id":id},actor)
            .then(obj => res.status(200).json({
                message:res.__("Actor.updated"),
                obj:obj
            })).catch(ex => res.status(500).json({
                message:res.__("Actor.notupdated"),
                obj:ex
            }));
};

function destroy(req, res, next){
    const id = req.params.id;
    Actor.findByIdAndDelete({"_id":id}).then(obj => res.status(200).json({
        message: res.__("Actor.deleted"),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__("Actor.notdeleted"),
        obj:ex
    }));
};

module.exports = {list,index,create,update,destroy,replace};