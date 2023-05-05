const express = require('express');
const Booking = require('../models/booking');
const Member = require('../models/member');
const Copy = require('../models/copy');

function list(req, res, next){
    Booking.find().then(objs => res.status(200).json({
        message:res.__("Booking.list"),
        obj:objs
    })).catch(ex => res.status(500).json({
        message:res.__("Booking.notlist")
    }));
};

function index(req, res, next){
    const id = req.params.id;
    Booking.findOne({"_id":id}).then(obj=>res.status(200).json({
        message:res.__("Booking.index"),
        obj: obj
    })).catch(ex => res.status(500).json({
            message:res.__("Booking.notindex"),
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
        message:res.__("Booking.create"),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__("Booking.notcreated"),
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
            message:res.__("Booking.replaced"),
            obj:obj
        })}).catch(ex => res.status(500).json({
            message:res.__("Booking.notreplaced"),
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
    Booking.findOneAndUpdate({"_id":id},booking)
           .then(obj => res.status(200).json({
            message:res.__("Booking.updated"),
            obj:obj
           })).catch(ex => res.status(500).json({
            message:res.__("Booking.notupdated"),
            err:ex
           }));
};

function destroy(req, res, next){
    const id = req.params.id;
    Booking.findOneAndUpdate({"_id":id}.then(obj=>res.status(200).json({
        message:res.__("Booking.deleted"),
        obj:obj
    }))).catch(ex => res.status(500).json({
        messages:res.__("Booking.notdeleted"),
        err:ex
    }))
};

module.exports = {list,index,create,update,destroy,replace};