const express = require('express');
const Booking = require('../models/booking');
const Member = require('../models/member');
const Copy = require('../models/copy');

function list(req, res, next){
    Booking.find().then(objs => res.status(200).json({
        message:"Lista de reservas",
        obj:objs
    })).catch(ex => res.status(500).json({
        message:"No se pudo consultar la info"
    }));
};

function index(req, res, next){
    const id = req.params.id;
    Booking.findOne({"_id":id}).then(obj=>res.status(200).json({
        message:`Booking con id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
            message:"No se pudo consultar la información",
            obj:ex
    }));
};

async function create(req, res, next){
    const date = req.body.date;
    const memberId = req.body.memberId;
    const copyId = req.body.copyId;

    let member = await Member.findOne({"_id":memberId});
    let copy = await Copy.findOne({"_id":copyId});

    let booking = new Booking({
        date:date,
        member:member,
        copy:copy
    })

    booking.save().then(obj => res.status(200).json({
        message:"Booking creted",
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"Booking not created",
        err: ex
    }))

};

function replace(req, res, next){
    const id = req.params.id;
    let date = req.body.date ? req.body.name :"";
    let member = req.body.member ? req.body.member:"";
    let copy = req.body.copy ? req.body.copy:"";
};

function update(req, res, next){
    res.send(`respond with an update =${req.params.id}`);  
};

function destroy(req, res, next){
    res.send(`respond with a destroy =${req.params.id}`);  
};

module.exports = {list,index,create,update,destroy,replace};