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
    const id = req.params.id;
    Genre.findOne({"_id":id}).then(obj=>res.status(200).json({
        message: `Genre with id ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"No info",
        err:ex
    }))
};

function create(req, res, next){
    let description = req.params.description
    let genre = new Genre({
        description:description
    })
    genre.save().then(obj => res.status(200).json({
        message:"Generp creado correctamente",
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"No se pudo almacenar el genero",
        err:ex
    }));

};

function replace(req, res, next){
    const id = req.params.id;
    let description = req.body.description ? req.body.description:"";
    let genre = new Object({
        _description:description
    });
    Genre.findOneAndUpdate({"_id":id},genre,{new : true})
    .then(obj => {res.status(200).json({
        message: "Genero actualizado correctamente",
        obj:obj
    })}).catch(ex => res.status(500).json({
        message:"No se pudo remplazar el genero",
        obj:ex
    }));

};

function update(req, res, next){
    const id = req.params.id
    let description = req.params.description;
    
    let genre = new Object();

    if(description){
        genre._description = description;
    }

    Genre.findOneAndUpdate({"_id":id},genre)
    .then(obj => res.status(200).json({
        message:"Genero actuaizado correctamente",
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"No se pudo remplazar el genero",
        obj:ex
    }));

};

function destroy(req, res, next){
    const id = req.params.id;
    Genre.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        message: "Genero eliminado correctamente",
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"No se pudo eliminar el genero",
        obj:ex
    }));
    
};

module.exports = {list,index,create,update,destroy,replace};