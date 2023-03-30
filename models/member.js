const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _name:String,
    _lastName:String,
    _phone:String,
    _address:{
        street:String,
        number:String,
        zip:Number,
        state:String
    }
});

class Member{

    constructor(
        name,
        lastName,
        phone,
        address
    ){
        this._name = name;
        this._lastName = lastName;
        this._phone = phone;
        this._address = address
    }

    get name(){
        return this._name;
    }
    set name(value){
        this._name = value
    }
    get lastName(){
        return this._lastName;
    }
    set lastName(value){
        this._lastName = value
    }
    get phone(){
        return this._phone;
    }
    set phone(value){
        this._phone = value
    }
    get address(){
        return this._address;
    }
    set address(value){
        this._address = value
    }
}

schema.loadClass(Member);
module.exports = mongoose.model('Member',schema);