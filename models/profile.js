const mongoose = require('mongoose');

const schema =  mongoose.Schema({
    _description:String,
    _status:Boolean,
    _permissions:[{
        type:mongoose.Schema.ObjectId,
        ref:'Permission'
    }]
});

class Profile{
    constructor(
        description,
        status,
        permission
    ){
        this._description = description,
        this._status = status,
        this._permissions = permission
    }
    
    get description(){
        return this._description
    }
    set description(value){
        this._permissions = value;
    }
    
    get status(){
        return this._status;
    }
    set status(value){
        this._status = value;
    }

    get permission(){
        return this._permissions
    }
    set permission(value){
        this._permissions = value;
    }
}

schema.loadClass(Profile);
module.exports = mongoose.model('Profile',schema);