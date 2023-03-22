const express = require('express');
const {Copy} = require('../db');

function list(req, res, next){
    Copy.findAll({include:'movies'})
        .then(objects => res.json(objects))
        .catch(err => res.send(err))
};

function index(req, res, next){
    const id = req.params.id;
    Copy.findByPk(id)
        .then(object => res.json(object))
        .catch(err => res.send(err));
};

function create(req, res, next){
    let number = req.body.number;
    let format = req.body.format;
    let movieId = req.body.movieId;
    let estatus = req.body.estatus;

    let copy = new Object({
        number:number,
        format:format,
        movieId:movieId,
        estatus:state = estatus
    });

    Copy.create(copy)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
};

function replace(req, res, next){
    const id = req.params.id;
    Copy.findByPk(id)
        .then((object)=>{
            const number = req.body.number ? req.body.number:"";
            const format = req.body.format ? req.body.format:"";
            const movieId = req.body.movieId ? req.body.movieId:"";
            const estatus = req.body.estatus ? req.body.estatus: "";
            object.update(
                {
                    number:number,
                    format:format,
                    movieId:movieId,
                    estatus:estatus
                }).then(obj => res.json(obj))
                .catch(err => res.send(err))
        })
        .catch(err => res.send(err))
};

function update(req, res, next){
    const id = req.params.id;
    Copy.findByPk(id)
        .then((object)=>{
            const number = req.body.number ? req.body.number:object.number;
            const format = req.body.format ? req.body.format:object.format;
            const movieId = req.body.movieId ? req.body.movieId:object.movieId;
            const estatus = req.body.estatus ? req.body.estatus:object.estatus;
            object.update(
                {
                    number:number,
                    format:format,
                    movieId:movieId,
                    estatus:estatus
                }).then(obj => res.json(obj))
                .catch(err => res.send(err))
        })
        .catch(err => res.send(err))
};

function destroy(req, res, next){
    const id = req.params.id;
    Copy.destroy({where:{id:id}})
        .then(obj=>res.json(obj))
        .catch(err => res.send(err));
};

module.exports = {list,index,create,update,destroy,replace};