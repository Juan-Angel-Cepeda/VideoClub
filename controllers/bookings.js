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

async function replace(req, res, next){
    const id = req.params.id;
    let date = req.body.date ? req.body.name :"";
    let memberId = req.body.member ? req.body.member:"";
    let copyId = req.body.copy ? req.body.copy:"";

    let member = await Member.findOne({"_id":memberId});
    let copy = await Copy.findOne({"_id":copyId});

    let booking = new Object({
        _date:date,
        _member:member,
        _copy:copy
    });

    Booking.findOneAndUpdate({"_id":id},booking,{new:true})
        .then(obj=>{res.status(200).json({
            message:"Copy replaced",
            obj:obj
        })}).catch(ex => res.status(500).json({
            message:"Copy not replaced",
            err:ex
        }));
};

async function update(req, res, next){
    const id = req.params.id;
    let date = req.body.date
    let memberId = req.body.member
    let copyId = req.body.copy

    let member = await Member.findOne({"_id":memberId});
    let copy = await Copy.findOne({"_id":copyId});

    let booking = new Object

    if(date){
        booking._date = date;
    }
    if(member){
        booking._member = member;
    }
    if(copy){
        booking._copy = copy;
    }
    Booking.findByIdAndUpdate({"_id":id},booking)
           .then(obj => res.status(200).json({
            message:"Booking updated",
            obj:obj
           })).catch(ex => res.status(500).json({
            message:"Booking not updated",
            err:ex
           }));
};

function destroy(req, res, next){
    const id = req.params.id;
    Booking.findByIdAndRemove({"_id":id}.then(obj=>res.status(200).json({
        message:"Booking deleted",
        obj:obj
    }))).catch(ex => res.status(500).json({
        message:"Booking not deleted",
        err:ex
    }))
};

module.exports = {list,index,create,update,destroy,replace};