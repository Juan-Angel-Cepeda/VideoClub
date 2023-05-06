const express = require('express');
const Copy = require('../models/copy');
const Movie = require('../models/movie');

function list(req, res, next){
    Copy.find().then(objs => res.status(200).json({
        message: res.__("Copy.list"),
        obj:objs
    })).catch(ex => res.status(500).json({
        message:res.__("Copy.notlist"),
        obj:ex
    }))
};

function index(req, res, next){
    const id = req.params.id;
    Copy.findOne({"_id":id}).then(obj=>res.status(200).json({
        message: res.__("Copy.index"),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__("Copy.notindex"),
        err:ex
    }))
};

async function create(req, res, next){
    let number = req.body.number;
    let format = req.body.format;
    let movieId = req.body.movieId;
    let status = req.body.status;

    let movie = await Movie.findOne({"_id":movieId});

    let copy = new Copy({
        number:number,
        format:format,
        movie:movie,
        status:status
    });
    copy.save().then(obj => res.status(200).json({
        message:res.__("Copy.created"),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__("Copy.notcreated"),
        err:ex
    }))

};

async function replace(req, res, next){
    const id = req.params.id;
    let number = req.body.number ? req.body.number:"";
    let format = req.body.format ? req.body.format:"";
    let movieId = req.body.movieId ? req.body.movieId:"";
    let status = req.body.status ? req.body.status:"";
    
    let movie= await Movie.findOne({"_id":movieId});

    let copy = new Object({
        _format:format,
        _number:number,
        _status:status,
        _movie:movie
    })

    Movie.findOneAndUpdate({"_id":id},copy,{new:true})
         .then(obj => {res.status(200).json({
            message:res.__("Copy.replaced"),
            obj:obj
        })}).catch(ex => res.status(500).json({
            message:res__("Copy.notreplaced"),
            err:ex
        }));
};

async function update(req, res, next){
    const id = req.params.id;
    let format = req.body.format;
    let number = req.body.number;
    let status = req.body.status;
    let movieId = req.body.movieId;
    
    let copy = new Object();

    if(format){
        copy._format = format
    }
    if(number){
        copy._movie = number;
    }
    if(status){
        copy._status = status;
    }
    if(movieId){
        let movie = await Movie.findOne({"_id":movieId});
        copy._movie = movie
    }
    Copy.findOneAndUpdate({"_id":id},copy)
        .then(obj=>res.status(200).json({
            message:res.__("Copy.updated"),
            obj:obj
        })).catch(ex => res.status(500).json({
            message:res.__("Copy.notupdated"),
            err:ex
        }));

};

function destroy(req, res, next){
    const id = req.params.id;
    Copy.findOneAndDelete({"_id":id}).then(obj=>res.status(200).json({
        message:res.__("Copy.deleted"),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__("Copy.notdeleted"),
        err:ex
    }));
};

module.exports = {list,index,create,update,destroy,replace};