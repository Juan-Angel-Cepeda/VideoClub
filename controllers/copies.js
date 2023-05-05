const express = require('express');
const Copy = require('../models/copy');
const Movie = require('../models/movie');

function list(req, res, next){
    Copy.find().then(objs => res.status(200).json({
        message: "copies list",
        obj:objs
    })).catch(ex => res.status(500).json({
        message:"Error en la consulta",
        obj:ex
    }))
};

function index(req, res, next){
    const id = req.params.id;
    Copy.findOne({"_id":id}).then(obj=>res.status(200).json({
        message: `Copy with id ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"No info",
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
        message:"Copy created",
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"Copy not created",
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
            message:"Copy update",
            obj:obj
        })}).catch(ex => res.status(500).json({
            message:"Director not update",
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
        let movie = await Movie.findById({"_id":movieId});
        copy._movie = movie
    }
    Copy.findByIdAndUpdate({"_id":id},copy)
        .then(obj=>res.status(200).json({
            message:"Copy updated",
            obj:obj
        })).catch(ex => res.status(500).json({
            message:"Copy not updated",
            obj:ex
        }));

};

function destroy(req, res, next){
    const id = req.params.id;
    Copy.findOneAndDelete({"_id":id}).then(obj=>res.status(200).json({
        message:"Copy deleted",
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"Copy not deleted",
        err:ex
    }));
};

module.exports = {list,index,create,update,destroy,replace};