const express = require('express');
const Member = require('../models/member');

function list(req, res, next){
    Member.find().then(objs => res.status(200).json({
        message:"Lista de socios",
        obj:objs
    })).catch(ex => res.status(500).json({
        message:"No se ha logrado encontrar la lista de socios",
        obj:ex
    }))
};

function index(req, res, next){
    const id = req.params.id;
    Member.findOne({"_id":id}).then(obj=>res.status(200).json({
        message: `Member with id ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"No info",
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
        message: "Socio creado correctamente",
        obj:obj
    })).catch(ex => res.status(500).json({
        message: "No se logró crear un socio",
        obj: ex
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

    Member.findByIdAndUpdate({"_id":id},member,{new:true})
          .then(obj=>{res.status(200).json({
            message:"Member updated",
            obj:obj
          })}).catch(ex=> res.status(500).json({
            message:"Member not updated",
            obj:ex
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
    Member.findByIdAndUpdate({"_id":id},member)
          .then(obj=>res.status(200).json({
            message:"Member updated",
            obj:obj
          })).catch(ex => res.status(500).json({
            message:"Memeber not udpated",
            err:ex
          }))
    
};

function destroy(req, res, next){
    const id = req.params.id;
    Member.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        message: "Member deleted",
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"Member not deleted",
        obj:ex
    }));
};

module.exports = {list,index,create,update,destroy,replace};