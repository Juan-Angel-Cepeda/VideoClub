const express = require('express');
const Member = require('../models/member');

function list(req, res, next){
    Member.find().then(objs => res.status(200).json({
        message:res.__("Member.list"),
        obj:objs
    })).catch(ex => res.status(500).json({
        message:res.__("Member.notlist"),
        err:ex
    }))
};

function index(req, res, next){
    const id = req.params.id;
    Member.findOne({"_id":id}).then(obj=>res.status(200).json({
        message:res.__("Member.index"),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__("Member.notindex"),
        err:ex
    }))
};

function create(req, res, next){
    let name = req.body.name;
    let lastName  = req.body.lastName;
    let phone = req.body.phone;
    let address = new Object();
    
    address.street = req.body.street;
    address.number = req.body.number;
    address.zip = req.body.zip;
    address.state = req.body.state;

    let member = new Member({
        name:name,
        lastName:lastName,
        phone:phone,
        address: address,
    })
    member.save().then(obj => res.status(200).json({
        message: res.__("Member.create"),
        obj:obj
    })).catch(ex => res.status(500).json({
        message: res.__("Member.notcreate"),
        err: ex
    }))
};

function replace(req, res, next){
    const id = req.params.id
    let name = req.body.name ? req.body.name:"";
    let lastName  = req.body.lastName ? req.body.lastName:"";
    let phone = req.body.phone ? req.body.phone:"";
    //address Object
    let street = req.body.street ? req.body.street:"";
    let number = req.body.number ? req.body.number:"";
    let zip = req.body.zip ? req.body.zip:"";
    let state = req.body.state ? req.body.state:"";
    
    let address = new Object({
        _street:street,
        _number:number,
        _zip:zip,
        _state:state
    });
    
    let member = new Object({
        _name:name,
        _lastName:lastName,
        _phone:phone,
        _address:address
    });

    Member.findOneAndUpdate({"_id":id},member,{new:true})
          .then(obj=>{res.status(200).json({
            message:res.__("Member.replaced"),
            obj:obj
          })}).catch(ex=> res.status(500).json({
            message:res.__("Member.notreplaced"),
            err:ex
          }))

};

function update(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName  = req.body.lastName;
    let phone = req.body.phone;
    
    let street = req.body.street;
    let number = req.body.number;
    let zip = req.body.zip;
    let state = req.body.state;

    let member = new Object();
    let address = new Object();

    if(name){
        member._name = name
    }
    if(lastName){
        member._lastName = lastName;
    }
    if(phone){
        member._phone = phone;
    }
    if(street){
        address._street = street;
    }
    if(number){
        address._number = number;
    }
    if(zip){
        address._zip = zip
    }
    if(state){
        address._state = state
    }
    member._address = address;
    Member.findOneAndUpdate({"_id":id},member)
          .then(obj=>res.status(200).json({
            message:res.__("Member.update"),
            obj:obj
          })).catch(ex => res.status(500).json({
            message:res.__("Member.notupdate"),
            err:ex
          }))
    
};

function destroy(req, res, next){
    const id = req.params.id;
    Member.findOneAndRemove({"_id":id}).then(obj => res.status(200).json({
        message:res.__("Member.delete"),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__("Member.notdeleted"),
        obj:ex
    }));
};

module.exports = {list,index,create,update,destroy,replace};