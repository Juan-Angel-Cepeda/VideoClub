const express = require('express');
const AwaitList = require('../models/awaitList');
const Member = require('../models/member');
const Movie = require('../models/movie');

function list(req, res, next){
    AwaitList.find().then(objs=>res.status(200).json({
        message:res.__('Awaitlist.list'),
        obj:objs
    })).catch(ex => res.status(500).json({
        message:res.__("Awaitlist.not"),
        err:ex
    }))
};

function index(req, res, next){
    const id = req.params.id;
    AwaitList.findOne({"_id":id}).then(obj => res.status(200).json({
        message:res.__('Awaitlist.index'),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__('Awaitlist.noindex'),
        err:ex
    }))
};

async function create(req, res, next){
    
    let memberId = req.body.memberid;
    let movieId = req.params.movieId;

    let member = await Member.findOne({"_id":memberId});
    let movie = await Movie.findOne({"_id":movieId});

    let awaitList = new AwaitList({
        member:member,
        movie:movie
    })
    awaitList.save().then(obj=>res.status(200).json({
        message:res.__('Awaitlist.created'),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__('Awaitlist.notcreated'),
        err:ex
    }))
};

async function replace(req, res, next){
    const id = req.params.id
    let memberId = req.body.memberid ? req.body.memberId:"";
    let movieId = req.params.movieId ? req.body.movieId:"";

    let member = await Member.findOne({"_id":memberId});
    let movie = await Movie.findOne({"_id":movieId});

    let awaitList = new Object({
        _member: member,
        _movie: movie
    });

    AwaitList.findOneAndUpdate({"_id":id},awaitList,{new:true})
             .then(obj=>{res.status(200).json({
                message:res.__("Awaitlist.replaced"),
                obj:obj
             })}).catch(ex => res.status(500).json({
                message:res.__("Awaitlist.notreplaced"),
                err:ex
             }))

};

async function update(req, res, next){
    const id = req.params.id;
    let memberId = req.body.memberId;
    let movieId = req.body.movieId;

    let movie = await Movie.findOne({"_id":movieId});
    let member = await Member.findOne({"_id":memberId});

    let awaitList = new Object();
    if(movie){
        awaitList._movie = movie;
    }
    if(member){
        awaitList._member = member;
    }
    AwaitList.findOneAndUpdate({"_id":id},awaitList)
             .then(obj=> res.status(200).json({
                message:res.__('Awaitlist.updated'),
                obj:obj
             })).catch(ex => res.status(500).json({
                message:res.__("Awaitlist.notupdated"),
                err:ex
             }))

};


function destroy(req, res, next){
    const id = req.params.id;
    AwaitList.findOneAndDelete({"_id":id}).then(obj=>res.status(200).json({
        message:res.__("Awaitlist.destroy"),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__("Awaitlist.notdestroy"),
        err:ex
    }))
};

module.exports = {list,index,create,update,destroy,replace};