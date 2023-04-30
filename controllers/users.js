const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

async function create(req, res, next) {
    
    let name = req.body.name;
    let lastname = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;

    //Generar el salt con las iteraciones para generar la cadena
    const salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(password, salt);

    let user = new User({
        name: name,
        lastname: lastname,
        email: email,
        password: passwordHash,
        salt: salt
    });

    user.save().then(obj => res.status(200).json({
        message: "Usuario creado correctamente",
        obj: obj
        })).catch(ex => res.status(500).json({
            message: "No se pudo almacenar el usuario",
            obj: ex
        }));
}


async function update(req, res, next) {
    try{
        const userId = req.params.id;
        const {currerntPassword, newPassword} = req.body;
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:"User not found"
            });
        }
        const isMatch = await bcrypt.compare(currerntPassword,user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"Password is not correct"
            })

        }
        const salt = await bcrypt.genSalt(10);
        const newPasswordHash = await bcrypt.hash(newPassword,salt);
        await User.updateOne({"_id":userId},{password:newPasswordHash,salt:salt})
        res.status(200).json({
            message:"Password Updated"
        })
    }catch( err ){
        res.status(500).json({
            message:"Error in update",
            ex:err
        });
    }
}

async function destroy(req, res, next) {
    try {
        const userId = req.params.id;
        const result = await User.deleteOne({_id: userId});
        if (result.deletedCount === 1) {
            res.status(200).json({
                message: "Usuario eliminado correctamente"
            });
        } else {
            res.status(404).json({
                message: "No se encontró el usuario con el id proporcionado"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el usuario",
            obj: error
        });
    }
    
}

module.exports = { 
    create,
    update,
    destroy
};