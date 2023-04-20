const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function home(req, res, next){
    res.render('index', {title: 'Express'});
}

function login(req, res, next){
    const email = req.body.email;
    const password = req.body.password;
    const jwtKey = "0deec8e659b8b570e53e8d54244ea0f7";

    //Busca un usuario en el sistema en donde sea el email que coincide
    User.findOne({"_email":email}).select('_password _salt').then(user =>{ 
        console.log(user);
        if(user){
            bcrypt.hash(password, user.salt, (err, hash) => {
                console.log("llego hasta aqui 2"+hash);
                if(err){
                    res.status(403).json({
                        message: "Usuario y/o contrasena incorrecto 1",
                        obj: err
                    });
                }
                console.log("llego hasta aqui");
                if(hash === user.password){
                    res.status(200).json({
                        message: "Login ok",
                        obj: jwt.sign({data: user.id,exp: Math.floor(Date.now()/1000)+60}, jwtKey)
                    });
                }else{
                    res.status(403).json({
                        message: "Usuario y/o contrasena incorrecto 2",
                        obj: null
                    });
                }
            });
        }else{
            res.status(403).json({
                message: "Usuario y/o contrasena incorrecto 3",
                obj: null
            });
        }
    }).catch(ex => res.status(403).json({
        message: "Usuario y/o contrasena incorrecto 4",
        obj: ex
    }));
}

module.exports = {
    home,
    login
};