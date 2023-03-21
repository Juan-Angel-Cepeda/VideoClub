const express = require('express');
const {Booking} = require('../db');


function list(req, res, next){
    Booking.findAll()
            .then(objects = res.json(objects))
            .catch(err => res.send(err));
};

function index(req, res, next){
    const id = req.params.id;
    Booking.findByPk(id)
            .then(object=> res.json(object))
            .catch(err => res.send(err));
};

function create(req, res, next){
    let id = req.id;
    let date = req.date;
    let memberId = req.memberId;
    let copyId = req.copyId;

    let booking = new Object({
        id:id,
        date:date,
        memberId:memberId,
        copyId:copyId
    });

    Booking.create(booking)
            .then(obj = res.json(obj))
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